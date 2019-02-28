import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import actions from '../redux/actions';
import { Feeds, ITweet } from './Feeds';
import { Login } from './Login';
import { Settings } from './Settings';

export interface IUser {
    name?: string;
    photo?: string;
}

export interface IAppProps {
    keywords?: string[];
    providers?: string[];
    tweets?: ITweet[];
    socket: SocketIOClient.Socket;
    user?: IUser;
    actions?: any;
}

class App extends React.Component<IAppProps, {}> {

    public isAuthenticated(): boolean {
        return this.props.user.name !== undefined;
    }

    public render() {
        const props = this.props;

        return (
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    render={(routeProps) => (
                        this.isAuthenticated() ? <Redirect to='/feeds' /> :
                        <Login
                            {...routeProps}
                            {...{
                                providers: props.providers,
                                setKeywords: props.actions.setKeywords,
                                setUser: props.actions.setUser,
                                socket: props.socket
                            }}
                        />)}
                />
                <Route
                    path='/feeds'
                    render={(routeProps) => (
                        this.isAuthenticated() ? (
                            <Feeds
                                {...routeProps}
                                {...{
                                    setTweets: props.actions.setTweets,
                                    setUser: props.actions.setUser,
                                    socket: props.socket,
                                    tweets: props.tweets,
                                    user: props.user
                                }}
                            />)
                            : (<Login
                                {...routeProps}
                                {...{
                                    providers: props.providers,
                                    setKeywords: props.actions.setKeywords,
                                    setUser: props.actions.setUser,
                                    socket: props.socket
                                }}
                            />)
                    )}
                />
                <Route
                    path='/settings'
                    render={(routeProps) => (
                        this.isAuthenticated() ? (
                            <Settings
                                {...routeProps}
                                {...{
                                    addKeyword: props.actions.addKeyword,
                                    keywords: props.keywords,
                                    removeKeyword: props.actions.removeKeyword,
                                    setUser: props.actions.setUser,
                                    socket: props.socket,
                                    user: props.user
                                }}
                            />)
                            : (<Login
                                {...routeProps}
                                {...{
                                    providers: props.providers,
                                    setKeywords: props.actions.setKeywords,
                                    setUser: props.actions.setUser,
                                    socket: props.socket
                                }}
                            />)
                    )}
                />
            </Switch>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
