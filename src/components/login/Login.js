// Dependencies
import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, notification, Divider } from 'antd';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

// Icons
import { UserOutlined, LockOutlined, CheckCircleTwoTone, GoogleOutlined } from '@ant-design/icons';

// Context
import { AuthContext } from '../../context/auth';

// Fetch Config
import { post } from '../../config/api';

// Styles
const dividerFontSize = { fontSize: '1rem' };

// Antdesign
const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Login = () => {
    const { authenticate, isAuthenticated } = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
    let { from } = location.state || { from: { pathname: '/' } };

    const formSuccess = (data) => {
        post('/users/login', data)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error en Login',
                        description: response.errors.msg,
                    });
                } else {
                    const dataUser = {
                        token: response.data.token,
                        ...response.data.user,
                    };
                    authenticate(dataUser, () => {
                        history.replace(from);
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error en Login',
                    description: 'Verifica los datos ingresados y vuelve a intentarlo.',
                });
                console.log(error);
            });
    };

    const formFailed = (error) => {
        console.log('Error: ', error);
    };

    const responseGoogle = (response) => {
        const tokenId = { tokenId: response.tokenId };
        // console.log(response.tokenId);
        post('/users/google', tokenId)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error en Login',
                        description: 'Se ha producido un error al iniciar la sesión de Google.',
                    });
                } else {
                    const dataUser = {
                        token: response.data.token,
                        ...response.data.user,
                    };
                    authenticate(dataUser, () => {
                        history.replace(from);
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error en Login',
                    description: 'Se ha producido un error al iniciar la sesión de Google.',
                });
                console.log(error);
            });
    };

    const responseFacebook = (response) => {
        const facebookData = { accessToken: response.accessToken, userID: response.userID };
        // console.log(response);
        post('/users/facebook', facebookData)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error en Login',
                        description: 'Ha ocurrido un error al iniciar la sesión de facebook.',
                    });
                } else {
                    const dataUser = {
                        token: response.data.token,
                        ...response.data.user,
                    };
                    authenticate(dataUser, () => {
                        history.replace(from);
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error en Login',
                    description: 'Ha ocurrido un error al iniciar la sesión de facebook.',
                });
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="form animate__animated animate__fadeIn">
                <CheckCircleTwoTone
                    style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }}
                />
                <Title level={3} className="title">
                    React Contactos
                </Title>

                <Form name="form" onFinish={formSuccess} onFinishFailed={formFailed}>
                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, ingresa tu nombre de usuario',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Nombre de Usuario"
                            size="large"
                            autoComplete="off"
                        />
                    </Item>

                    <Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, ingresa tu contraseña',
                            },
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Contraseña"
                            size="large"
                        />
                    </Item>

                    {/* Local Login Button */}
                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="button-submit"
                            size="large"
                        >
                            Login
                        </Button>
                    </Item>

                    <Divider style={dividerFontSize}>Or</Divider>

                    {/* Google Login Button */}
                    <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        render={(renderProps) => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="button-submit"
                                size="large"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                danger
                            >
                                <GoogleOutlined /> Login con Google
                            </Button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    {/* Facebook Login Button */}
                    <FacebookLogin
                        appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                        callback={responseFacebook}
                        cssClass="button-submit facebook-button"
                        textButton={<span>Login con Facebook</span>}
                        icon="fa-facebook"
                        disableMobileRedirect={true}
                    />

                    <Item style={{ textAlign: 'center', marginTop: '10px' }}>
                        <span style={{ marginRight: '8px' }}>¿Necesitas una cuenta?</span>
                        <Link to="/auth/register">Registrar</Link>
                        <br />
                        <span style={{ marginRight: '8px' }}>¿Olvidaste tu contraseña?</span>
                        <Link to="/auth/recover-password">Recuperar</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
