import { Button, Icon } from 'antd';
import * as React from 'react';
import { API_URL } from '../index';
import { IUser } from './App';

export interface IOAuthProps {
    socket: SocketIOClient.Socket;
    provider: string;
    setUser: (user: IUser) => void;
    setKeywords: (keywords: string[]) => void;
}

export interface IOAuthState {
    disabled: boolean;
}

export class OAuth extends React.Component<IOAuthProps, IOAuthState> {

    private popup: Window;
    private check: number;

    constructor(props: IOAuthProps) {
        super(props);

        this.state = {
            disabled: false
        };
    }

    public componentDidMount(): void {
        const { socket, provider } = this.props;

        socket.once(provider, (user) => {
            const userData = { name: user.name, photo: user.photo };

            this.popup.close();
            this.props.setUser(userData);
            this.props.setKeywords(user.keywords);
        });
    }

    public componentWillUnmount(): void {
        clearInterval(this.check);
        this.props.socket.removeListener(this.props.provider);
    }

    public render() {
        const { disabled } = this.state;

        return (
            <div style={{ height: '100%' }}>
                <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', height: '100%' }}>
                    <div>
                        <Button
                            style={{ width: '100px', height: '100px' }}
                            size='large'
                            type='primary'
                            shape='circle'
                            disabled={disabled}
                            onClick={this.startAuth.bind(this)}
                        >
                            <Icon type='twitter' style={{ fontSize: '50px' }} />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    private checkPopup(): void {
        this.check = setInterval(() => {
            if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
                clearInterval(this.check);
                this.setState({ disabled: false });
            }
        }, 1000);
    }

    private openPopup(): Window {
        const { provider, socket } = this.props;
        const width = 600;
        const height = 600;
        const left = (window.innerWidth / 2) - (width / 2);
        const top = (window.innerHeight / 2) - (height / 2);
        const url = `${API_URL}/${provider}?socketId=${socket.id}`;

        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no,
            scrollbars=no, resizable=no, copyhistory=no, width=${width},
            height=${height}, top=${top}, left=${left}`
        );
    }

    private startAuth(e): void {
        if (!this.state.disabled) {
            e.preventDefault();
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({ disabled: true });
        }
    }
}
