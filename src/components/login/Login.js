// Dependencies
import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Form, Input, Button, Typography, notification } from 'antd';

// Components
import { UserOutlined, LockOutlined, CheckCircleTwoTone } from '@ant-design/icons';

// Context
// import { AuthContext } from '../context/auth';

// Fetch Config
import { post } from '../../config/api';

// Styles
import './Login.css';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Login = () => {
    // const { authenticate, isAuthenticated } = useContext(AuthContext);

    // if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
    // let { from } = location.state || { from: { pathname: '/' } };

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
                    // authenticate(dataUser, () => {
                    //     history.replace(from);
                    // });
                    console.log(dataUser);
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
                                message: 'Por favor ingresar nombre de usuario',
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
                                message: 'Por favor ingresar la contraseña',
                            },
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password"
                            size="large"
                        />
                    </Item>

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
                </Form>
            </div>
        </div>
    );
};

export default Login;
