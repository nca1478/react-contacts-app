// Dependencies
import React, { useEffect } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';

// Fetch Config
import { put } from '../../config/api';

// Icons
import { UserOutlined, LockOutlined, ProfileTwoTone, MailOutlined } from '@ant-design/icons';

// Styles
import './User.css';

// Antdesign
const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const User = ({ userProfile }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            id: userProfile.id,
            fullname: userProfile.name,
            email: userProfile.email,
            token: userProfile.token,
        });
    }, [userProfile]);

    const onUpdate = async (data) => {
        const dataUser = {
            name: data.fullname,
            email: data.email,
            password: data.password,
            token: data.token,
        };
        await put(`/users/${data.id}`, dataUser, dataUser.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error trying to updating user into the database.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'User successfully updated.',
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error trying to updating user into the database.',
                });
                console.log(error);
            });
    };

    const formSuccess = () => {
        form.validateFields()
            .then((values) => {
                // form.resetFields();
                onUpdate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const formFailed = (error) => {
        console.log('Error: ', error);
    };

    return (
        <div className="container-profile">
            <div className="form">
                <ProfileTwoTone style={{ fontSize: '70px', color: 'blue', marginBottom: '10px' }} />
                <Title level={3} className="login-title">
                    User Profile
                </Title>

                <Form
                    form={form}
                    name="user-form"
                    onFinish={formSuccess}
                    onFinishFailed={formFailed}
                >
                    <Item name="id" hidden={true}>
                        <Input />
                    </Item>

                    <Item
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your fullname',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Fullname"
                            size="large"
                        />
                    </Item>

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
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
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

                    <Item name="token" hidden={true}>
                        <Input />
                    </Item>

                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            Save
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default User;
