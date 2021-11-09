// Dependencies
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, notification, Spin, Space } from 'antd';

// Components
import { MailTwoTone, MailOutlined } from '@ant-design/icons';

// Fetch Config
import { put } from '../../config/api';

// Styles
import './RecoverPassword.css';

// Antdesign
const { Item } = Form;
const { Title } = Typography;

const RecoverPassword = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const formSuccess = (data) => {
        setLoading(true);
        put('/users/recovery', data)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: response.errors.msg,
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: response.data.msg,
                    });
                }
                form.resetFields();
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error sending email!, Try again.',
                });
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formFailed = (error) => {
        console.log('Error: ', error);
    };

    return (
        <div className="container-recover">
            <div className="form">
                <MailTwoTone style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }} />
                <Title level={3} className="login-title">
                    Recover Password
                </Title>

                <Form
                    form={form}
                    name="formulario"
                    onFinish={formSuccess}
                    onFinishFailed={formFailed}
                >
                    {loading ? (
                        <div className="form-spinner">
                            <Space size="middle">
                                <Spin size="large" className="spinner" />
                            </Space>
                        </div>
                    ) : (
                        <div className="form-items">
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
                                    placeholder="Enter your email..."
                                    size="large"
                                    autoFocus
                                />
                            </Item>

                            <Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    size="large"
                                >
                                    Send Email
                                </Button>
                            </Item>
                        </div>
                    )}

                    <Item style={{ textAlign: 'center' }}>
                        <span style={{ marginRight: '8px' }}>Do you already have an account?</span>
                        <Link to="/auth/login">Login</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default RecoverPassword;
