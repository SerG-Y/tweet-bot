import { Button } from 'antd';
import * as React from 'react';
import { API_URL } from './App';

export interface IOAuthProps {
    socket: SocketIOClient.Socket;
    provider: string;
}

export interface IOAuthState {
    user: any;
    disabled: boolean;
}

export class OAuth extends React.Component<IOAuthProps, IOAuthState> {

    private popup: Window;

    constructor(props: IOAuthProps) {
        super(props);

        this.state = {
            disabled: false,
            user: {}
        };
    }

    public componentDidMount() {
        const { socket, provider } = this.props;

        socket.on(provider, (user) => {
            this.popup.close();
            this.setState({ user });
        });
    }

    public render() {
        const { name, photo } = this.state.user;
        const { provider } = this.props;
        const { disabled } = this.state;

        return (
            <div>
                {name ?
                    <div>
                        <Button icon='close-circle' disabled={disabled} onClick={this.closeCard.bind(this)} />
                        <img src={photo} alt={name} />
                        <h4>{name}</h4>
                    </div> :
                    <Button type='primary' icon='twitter' disabled={disabled} onClick={this.startAuth.bind(this)}>
                        Login
                    </Button>
                }
            </div>
        );
    }

    private checkPopup() {
        const check = setInterval(() => {
            if (!this.popup || this.popup.closed || this.popup.closed === undefined) {
                clearInterval(check);
                this.setState({ disabled: false });
            }
        }, 1000);
    }

    private openPopup() {
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

    private startAuth(e) {
        if (!this.state.disabled) {
            e.preventDefault();
            this.popup = this.openPopup();
            this.checkPopup();
            this.setState({ disabled: true });
        }
    }

    private closeCard() {
        this.setState({ user: {} });
    }
}
