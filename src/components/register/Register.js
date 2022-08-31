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
                        message: 'Error de Registro',
                        description: 'Verifica los datos ingresados y vuelve a intentarlo.',
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
                    message: 'Error de Registro',
                    description: 'Verifica los datos ingresados y vuelve a intentarlo.',
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
                    Crear una cuenta
                </Title>

                <Form name="form" onFinish={formSuccess} onFinishFailed={formFailed}>
                    <Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingresa tu nombre completo',
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Nombre Completo..."
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
                                message: 'Por favor, ingresa tu contraseña',
                            },
                            {
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/,
                                message: `La contraseña debe tener 8 caracteres y 1 número`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Contraseña..."
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
                                message: '¡Por favor, confirma tu contraseña!',
                            },
                            {
                                pattern:
                                    /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!"#$%&()=?¿*-_.:,;+^\\-`.+,/]{8,}$/,
                                message: `La contraseña debe tener 8 caracteres y 1 número`,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        new Error(
                                            '¡Las dos contraseñas que ingresaste no coinciden!',
                                        ),
                                    );
                                },
                            }),
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="Confirmar Contraseña..."
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
                            Registrar
                        </Button>
                    </Item>

                    <Item style={{ textAlign: 'center' }}>
                        <span style={{ marginRight: '8px' }}>¿Ya tienes una cuenta?</span>
                        <Link to="/auth/login">Login</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
