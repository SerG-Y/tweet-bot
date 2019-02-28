import { Avatar, Card, List } from 'antd';
import * as React from 'react';
import { IUser } from './App';
import { Header } from './Header';

export interface IFeedsProps {
    setTweets: (tweet) => void;
    setUser: (user: IUser) => void;
    socket: SocketIOClient.Socket;
    user: IUser;
    tweets: ITweet[];
}

export interface ITweet {
    name: string;
    text: string;
}

export class Feeds extends React.Component<IFeedsProps, {tweets: ITweet[]}> {

    constructor(props: IFeedsProps) {
        super(props);

        this.state = {
            tweets: this.props.tweets
        };
    }

    public componentDidMount(): void {
        this.props.socket.on('tweet', (tweet) => {
            let newItems = [{ ...tweet }, ...this.state.tweets];

            newItems = newItems.length > 15 ? newItems.slice(0, 15) : newItems;
            this.setState({tweets: newItems});
            this.props.setTweets(newItems);
        });
    }

    public componentWillUnmount(): void {
        this.props.socket.removeListener('tweet');
    }

    public render() {
        return (
            <div>
                <Header {...{ user: this.props.user, setUser: this.props.setUser }} />
                <div
                    style={{
                        alignItems: 'center',
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                        paddingTop: '40px'
                    }}
                >
                    <Card style={{ width: '75%' }}>
                        <List
                            itemLayout='horizontal'
                            dataSource={this.state.tweets}
                            renderItem={(tweet) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={tweet.userPhoto}
                                            />
                                        }
                                        title={`${tweet.name} - ${new Date(tweet.created_at).toLocaleString()}`}
                                        description={tweet.text}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}
