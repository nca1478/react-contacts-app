// Dependencies
import React, { useState, useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { Layout, Menu } from 'antd';

// Components
import Contacts from '../contacts/Contacts';
import Home from '../home/Home';

// Context
import { AuthContext } from '../../context/auth';

// Antdesign
const { Header, Content, Footer } = Layout;

const handleLogoutFailure = (error) => {
    console.log('Error Google Logout!!!', error);
};

const handleLogoutSuccess = () => {
    console.log('Logout!');
};

const Dashboard = () => {
    const [menuItem, setMenuItem] = useState('1');
    const { signout } = useContext(AuthContext);
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: handleLogoutSuccess,
        onFailure: handleLogoutFailure,
        cookiePolicy: 'single_host_origin',
    });

    const handleSignOut = () => {
        // Google SignOut
        signOut();

        // State App SignOut
        signout();
    };

    return (
        <div className="App">
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[menuItem]}>
                        <Menu.Item onClick={() => setMenuItem('1')} key="1">
                            Home
                        </Menu.Item>
                        <Menu.Item onClick={() => setMenuItem('2')} key="2">
                            Contacts
                        </Menu.Item>
                        <Menu.Item onClick={() => handleSignOut()} key="3">
                            Logout
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 134px)' }}>
                    {menuItem === '1' && <Home />}
                    {menuItem === '2' && <Contacts />}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright &copy; 2021 - React Contacts App
                </Footer>
            </Layout>
        </div>
    );
};

export default Dashboard;