import * as React from 'react';
import * as io from 'socket.io-client';
import {OAuth} from './OAuth';

export const API_URL = 'https://localhost:3000';
const providers = ['twitter'];
const socket = io(API_URL);

export class App extends React.Component<{}, {}> {

    public componentDidMount() {
        // socket.on('tweet', tweet => {
        //     console.log(tweet);
        // });
    }

    public render() {
        return (
            <div>
                {providers.map((provider) =>
                <OAuth
                    provider={provider}
                    key={provider}
                    socket={socket}
                />)}
            </div>
        );
    }
}
