// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { Layout, Menu, Avatar } from 'antd';

// Components
import Contacts from '../contacts/Contacts';
import Home from '../home/Home';
import User from '../user/User';

// Context
import { AuthContext } from '../../context/auth';

// Antdesign
const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

const handleLogoutFailure = (error) => {
    console.log('Error: Google Logout!', error);
};

const handleLogoutSuccess = () => {
    console.log('Bye, see you later!');
};

const Dashboard = () => {
    const {
        user: { auth },
    } = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false);
    const [menuItem, setMenuItem] = useState('1');
    const { signout } = useContext(AuthContext);
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        onLogoutSuccess: handleLogoutSuccess,
        onFailure: handleLogoutFailure,
        cookiePolicy: 'single_host_origin',
    });

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handleSignOut = () => {
        // Google SignOut
        signOut();

        // Local SignOut
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

                        <SubMenu
                            key="sub1"
                            icon={
                                loaded && auth.user.img ? (
                                    <Avatar size="large" src={auth.user.img} />
                                ) : (
                                    <Avatar size={40}>USER</Avatar>
                                )
                            }
                        >
                            {loaded && !(auth.user.google || auth.user.facebook) ? (
                                <Menu.Item onClick={() => setMenuItem('4')} key="4">
                                    Profile
                                </Menu.Item>
                            ) : null}

                            <Menu.Item onClick={() => handleSignOut()} key="3">
                                Logout
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px', minHeight: 'calc(100vh - 134px)' }}>
                    {menuItem === '1' && <Home />}
                    {menuItem === '2' && <Contacts />}
                    {menuItem === '4' && <User userProfile={auth.user} />}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Copyright &copy; 2021 - React Contacts App
                </Footer>
            </Layout>
        </div>
    );
};

export default Dashboard;
