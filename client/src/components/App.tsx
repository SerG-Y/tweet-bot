import * as React from 'react';
import { Button } from 'antd';
import socketIOClient from 'socket.io-client';

class App extends React.Component<{ API_URL: string }, {}> {

    componentDidMount() {
        // const socket = socketIOClient(this.props.API_URL);

        // socket.on('tweet', tweet => {
        //     console.log(tweet);
        // });
    }

    render() {
        return (
            <div>
                <Button type='primary'>Login</Button>
            </div>
        );
    }
}

export default App;