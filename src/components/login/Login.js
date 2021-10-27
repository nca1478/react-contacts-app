// Dependencies
import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, notification, Divider } from 'antd';
import GoogleLogin from 'react-google-login';

// Icons
import { UserOutlined, LockOutlined, CheckCircleTwoTone, GoogleOutlined } from '@ant-design/icons';

// Context
import { AuthContext } from '../../context/auth';

// Fetch Config
import { post } from '../../config/api';

// Styles
import './Login.css';
const dividerFontSize = { fontSize: '1rem' };

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
                        message: 'Login Error',
                        description: 'Please verify the data entered and try again.',
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
                    message: 'Login Error',
                    description: 'Please verify the data entered and try again.',
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
                        message: 'Login Error',
                        description: 'Please verify the data entered and try again.',
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
                    message: 'Login Error',
                    description: 'Please verify the data entered and try again.',
                });
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="form">
                <CheckCircleTwoTone
                    style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }}
                />
                <Title level={3} className="login-title">
                    Contacts App
                </Title>

                <Form name="formulario" onFinish={formSuccess} onFinishFailed={formFailed}>
                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your username',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            size="large"
                        />
                    </Item>

                    <Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your password',
                            },
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                            size="large"
                        />
                    </Item>

                    {/* Local Login Button */}
                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
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
                                className="login-form-button"
                                size="large"
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                danger
                            >
                                <GoogleOutlined /> Login with Google
                            </Button>
                        )}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                    <Item style={{ textAlign: 'center' }}>
                        <span style={{ marginRight: '8px' }}>Do you need an account?</span>
                        <Link to="/auth/register">Register</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
