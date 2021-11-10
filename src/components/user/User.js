// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Typography, notification } from 'antd';

// Context
import { AuthContext } from '../../context/auth';

// Fetch Config
import { put } from '../../config/api';

// Icons
import { UserOutlined, ProfileTwoTone, MailOutlined } from '@ant-design/icons';

// Modals
import PasswordForm from './modals/PasswordForm';

// Styles
import './User.css';

// Antdesign
const { Item } = Form;
const { Title } = Typography;

const User = ({ userProfile }) => {
    const {
        user: { auth },
    } = useContext(AuthContext);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        form.setFieldsValue({
            id: userProfile.id,
            fullname: userProfile.name,
            email: userProfile.email,
            token: userProfile.token,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userProfile]);

    const onUpdate = async ({ password }) => {
        setIsModalVisible(false);
        const dataUser = {
            name: formValues.fullname,
            email: formValues.email,
            password,
        };
        await put('/users/update', dataUser, auth.user.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error trying to updating user.',
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
                    description: 'Error trying to updating user.',
                });
                console.log(error);
            });
    };

    const formSuccess = () => {
        form.validateFields()
            .then((values) => {
                setFormValues(values);
                setIsModalVisible(true);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    const formFailed = (error) => {
        console.log('Error: ', error);
    };

    const onCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container-profile">
            <div className="form animate__animated animate__fadeIn">
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
                            placeholder="Email"
                            size="large"
                        />
                    </Item>

                    <PasswordForm
                        isModalVisible={isModalVisible}
                        onUpdate={onUpdate}
                        onCancel={onCancel}
                    />

                    <Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            size="large"
                        >
                            Update
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default User;
