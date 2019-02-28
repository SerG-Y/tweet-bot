import * as React from 'react';
import { IUser } from './App';
import { OAuth } from './OAuth';

export interface ILoginProps {
    providers: string[];
    socket: SocketIOClient.Socket;
    setUser: (user: IUser) => void;
    setKeywords: (keywords: string[]) => void;
}

export class Login extends React.Component<ILoginProps, {}> {
    public render() {
        const { providers, socket } = this.props;

        return (
            <div style={{ height: '100%' }}>
                {providers.map((provider) =>
                    <OAuth
                        provider={provider}
                        key={provider}
                        socket={socket}
                        setUser={this.props.setUser}
                        setKeywords={this.props.setKeywords}
                    />)
                }
            </div>
        );
    }
}
