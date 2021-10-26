// Dependencies
import React, { useContext } from 'react';
import { Redirect, useHistory, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Typography, notification } from 'antd';

// Components
import { UserOutlined, LockOutlined, CheckCircleTwoTone, MailOutlined } from '@ant-design/icons';

// Context
import { AuthContext } from '../../context/auth';

// Fetch Config
import { post } from '../../config/api';

// Styles
import './Register.css';

const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const Register = () => {
    const { authenticate, isAuthenticated } = useContext(AuthContext);
    const history = useHistory();
    const location = useLocation();

    if (isAuthenticated) return <Redirect to={{ pathname: '/' }} />;
    let { from } = location.state || { from: { pathname: '/' } };

    const formSuccess = (data) => {
        post('/users', data)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Login Error',
                        description: 'Please verify the data entered and try again.',
                    });
                } else {
                    // const dataUser = {
                    //     token: response.data.token,
                    //     ...response.data.user,
                    // };
                    authenticate(response.data, () => {
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

    return (
        <div className="container">
            <div className="form">
                <CheckCircleTwoTone
                    style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }}
                />
                <Title level={3} className="login-title">
                    Register
                </Title>

                <Form name="formulario" onFinish={formSuccess} onFinishFailed={formFailed}>
                    <Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your fullname',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Fullname..."
                            size="large"
                        />
                    </Item>

                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email..."
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
                            Register
                        </Button>
                    </Item>

                    <Item style={{ textAlign: 'center' }}>
                        <span style={{ marginRight: '8px' }}>Do you already have an account?</span>
                        <Link to="/auth/login">Login</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
