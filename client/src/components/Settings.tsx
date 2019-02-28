import { Button, Card, Input, List } from 'antd';
import * as React from 'react';
import { IUser } from './App';
import { Header } from './Header';

export interface ISettingsProps {
    addKeyword: (keyword: string) => void;
    removeKeyword: (keyword: string) => void;
    setUser: (user: IUser) => void;
    socket: SocketIOClient.Socket;
    user: IUser;
    keywords: string[];
}

export class Settings extends React.Component<ISettingsProps, {}> {

    constructor(props: ISettingsProps) {
        super(props);
    }

    public onDeleteBtnClicked(value: string): void {
        this.props.socket.emit('removeKeyword', value);
        this.props.removeKeyword(value);
    }

    public onAddBtnClicked(value: string): void {
        this.props.socket.emit('addKeyword', value);
        this.props.addKeyword(value);
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
                    <Card
                        title='Twitter keywords'
                        style={{ width: '35%' }}
                    >
                        <List
                            itemLayout='horizontal'
                            dataSource={this.props.keywords}
                            renderItem={(keyword: string) => (
                                <List.Item
                                    actions={[
                                        <Button
                                            key={keyword}
                                            onClick={(e) => this.onDeleteBtnClicked(keyword)}
                                            type='danger'
                                            icon='delete'
                                        />
                                    ]}
                                >
                                    <List.Item.Meta
                                        description={keyword}
                                    />
                                </List.Item>
                            )}
                        />
                        <Input.Search
                            enterButton={<Button>Add</Button>}
                            onSearch={(value) => this.onAddBtnClicked(value)}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}
