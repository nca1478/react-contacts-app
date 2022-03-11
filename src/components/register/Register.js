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
                        message: 'Register Error',
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
                    message: 'Register Error',
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
            <div className="form animate__animated animate__fadeIn">
                <CheckCircleTwoTone
                    style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }}
                />
                <Title level={3} className="title">
                    Create an Account
                </Title>

                <Form name="form" onFinish={formSuccess} onFinishFailed={formFailed}>
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
                            autoComplete="off"
                        />
                    </Item>

                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid email!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email..."
                            autoComplete="off"
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
                            {
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/,
                                message: `Password must have 8 characters and 1 number`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Password..."
                            size="large"
                        />
                    </Item>

                    <Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/,
                                message: `Password must have 8 characters and 1 number`,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            'The two passwords that you entered do not match!',
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Confirm Password..."
                            size="large"
                        />
                    </Item>

                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="button-submit"
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
