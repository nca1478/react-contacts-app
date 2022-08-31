// Dependencies
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, Typography, notification, Spin, Space } from 'antd';

// Components
import { LockOutlined, CheckCircleTwoTone } from '@ant-design/icons';

// Fetch Config
import { put } from '../../config/api';

// Helpers
import { decode } from '../../helpers/jwt';
import { capitalize } from '../../helpers/utils';

// Antdesign
const { Item } = Form;
const { Password } = Input;
const { Title } = Typography;

const ChangePassword = () => {
    const history = useHistory();
    const location = useLocation();
    const [form] = Form.useForm();
    const [token, setToken] = useState(false);
    const [infoToken, setInfoToken] = useState(null);
    const [errorToken, setErrorToken] = useState(null);
    const [isRecoveryPass, setIsRecoveryPass] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const { token = '' } = queryString.parse(location.search);

        if (token === '') {
            history.replace('/404');
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
    }, [location, history]);

    useEffect(() => {
        if (errorToken) {
            notification['error']({
                message: 'Error Token',
                description: capitalize(errorToken.message),
            });
            console.log(errorToken);
        }
    }, [errorToken]);

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
                        description: '¡Error al cambiar la contraseña! ¡Intentar otra vez!.',
                    });
                    setLoading(false);
                } else {
                    notification['success']({
                        message: 'Operación Exitosa',
                        description: response.data.msg,
                    });
                    setLoading(false);
                    setIsRecoveryPass(true);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: '¡Error al cambiar la contraseña! ¡Intentar otra vez!.',
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
                    Cambiar Contraseña
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
                                        message: '¡Por favor, confirme tu contraseña!',
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
                                                    '¡Las dos contraseñas que ingresó no coinciden!',
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Confirmar contraseña..."
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
                                    Guardar
                                </Button>
                            </Item>
                        </div>
                    )}

                    <Item style={{ textAlign: 'center' }}>
                        <span style={{ marginRight: '8px' }}>¿Ya tienes una cuenta?</span>
                        <Link to="/auth/login">Login</Link>
                    </Item>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
