// Dependencies
import React, { useState, useContext, useEffect } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { Layout, Menu, Avatar } from 'antd';

// Components
import Contacts from '../contacts/Contacts';
import User from '../user/User';

// Context
import { AuthContext } from '../../context/auth';

// Antdesign
const { Header, Content, Footer } = Layout;

const handleLogoutFailure = (error) => {
    console.log('Error: Al cerrar sesión de Google!', error);
};

const handleLogoutSuccess = () => {
    console.log('Hasta luego, te veremos proximamente!');
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
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[menuItem]}>
                        {/* <Menu.Item onClick={() => setMenuItem('1')} key="1">
                            Home
                        </Menu.Item> */}
                        <Menu.Item key="0">
                            {loaded && auth.user.img ? (
                                <Avatar size="large" src={auth.user.img} />
                            ) : (
                                <Avatar size={40}>Usuario</Avatar>
                            )}
                        </Menu.Item>
                        <Menu.Item onClick={() => setMenuItem('1')} key="1">
                            Contactos
                        </Menu.Item>

                        {loaded && !(auth.user.google || auth.user.facebook) ? (
                            <Menu.Item onClick={() => setMenuItem('2')} key="2">
                                Perfil
                            </Menu.Item>
                        ) : null}

                        <Menu.Item onClick={() => handleSignOut()} key="3">
                            Salir
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ minHeight: 'calc(100vh - 134px)' }}>
                    {/* {menuItem === '1' && <Home />} */}
                    {menuItem === '1' && <Contacts />}
                    {menuItem === '2' && <User userProfile={auth.user} />}
                </Content>
                <Footer className="footer">
                    Copyright &copy; 2022 <br />
                    Desarrollado por:{' '}
                    <a href="https://nelsoncadenas.netlify.app/" target="_blank" rel="noreferrer">
                        Nelson Cadenas
                    </a>
                </Footer>
            </Layout>
        </div>
    );
};

export default Dashboard;
