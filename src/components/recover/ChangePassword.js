// Dependencies
import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { Form, Input, Button, Typography, notification, Spin, Space } from 'antd';

// Components
import { LockOutlined, CheckCircleTwoTone } from '@ant-design/icons';

// Fetch Config
import { put } from '../../config/api';

// Helpers
import { getValueFromQuery } from '../../helpers/utils';
import { decode } from '../../helpers/jwt';

// Antdesign
const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const ChangePassword = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    const [token, setToken] = useState(false);
    const [infoToken, setInfoToken] = useState(null);
    const [errorToken, setErrorToken] = useState(null);
    const [isRecoveryPass, setIsRecoveryPass] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = getValueFromQuery(history.location.search, 'token');

        if (token === '') {
            history.push('/404');
        }

        const decodeToken = async () => {
            try {
                const decodedInfo = await decode(token);
                setInfoToken(decodedInfo);
            } catch (e) {
                setErrorToken(e);
            }
        };

        decodeToken();
        setToken(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formSuccess = (data) => {
        const dataUser = {
            email: infoToken.email,
            newPassword: data.password,
        };
        setLoading(true);
        put(`/users/recovery/${token}`, dataUser)
            .then((response) => {
                form.resetFields();
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error changing password! Try again!.',
                    });
                    setLoading(false);
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: response.data.msg,
                    });
                    setLoading(false);
                    setIsRecoveryPass(true);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error changing password! Try again!.',
                });
                console.log(error);
            });
    };

    const formFailed = (error) => {
        console.log('Error: ', error);
    };

    return isRecoveryPass ? (
        <Redirect to="/auth/login" />
    ) : (
        <div className="container">
            <div className="form animate__animated animate__fadeIn">
                <CheckCircleTwoTone
                    style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }}
                />
                <Title level={3} className="title">
                    Change Password
                </Title>

                <Form
                    form={form}
                    name="formulario"
                    onFinish={formSuccess}
                    onFinishFailed={formFailed}
                >
                    {loading ? (
                        <div className="form-spinner-change">
                            <Space size="middle">
                                <Spin size="large" className="spinner" />
                            </Space>
                        </div>
                    ) : (
                        <div className="form-items">
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
                                    autoFocus
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
                                    Save
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

export default ChangePassword;
