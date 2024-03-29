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
import PasswordForm from './modal/PasswordForm';

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
                        description: 'Error al intentar actualizar el usuario.',
                    });
                } else {
                    notification['success']({
                        message: 'Operación Exitosa',
                        description: 'Usuario actualizado exitosamente.',
                    });
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error tratando de actualizar usuario.',
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
                console.log('Validación Fallida:', info);
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
                <Title level={3} className="title">
                    Perfil del Usuario
                </Title>

                <Form form={form} name="form" onFinish={formSuccess} onFinishFailed={formFailed}>
                    <Item
                        name="fullname"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa tu nombre completo',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Nombre Completo"
                            size="large"
                            autoComplete="off"
                        />
                    </Item>

                    <Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa tu correo electrónico',
                            },
                            {
                                type: 'email',
                                message: '¡La entrada no es un correo electrónico válido!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="Email"
                            size="large"
                            autoComplete="off"
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
                            className="button-submit"
                            size="large"
                        >
                            Actualizar
                        </Button>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default User;
