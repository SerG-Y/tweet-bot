import { Icon, Menu } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header = (props) => (
    <Menu
        mode='horizontal'
        style={{ lineHeight: '64px' }}
    >
        <Menu.Item key='1'><Link to='/feeds'>Feeds</Link></Menu.Item>
        <Menu.Item key='2'><Link to='/settings'>Settings</Link></Menu.Item>
        <Menu.Item style={{ float: 'right' }} key='3'>
            <Link onClick={() => props.setUser({})} to='/'>
                <span style={{ paddingRight: 10 }}>{props.name}</span>
                <Icon type='logout' />
                Logout
            </Link>
        </Menu.Item>
    </Menu>
);
