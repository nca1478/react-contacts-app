// Dependencies
import React, { useEffect } from 'react';
import { Form, Input, Modal, Row, Col } from 'antd';

// Antdesign
const { Item } = Form;

// Initial Values
const initialFieldsValue = {
    id: '',
    fullname: '',
    phone1: '',
    celphone1: '',
    address: '',
    email: '',
};

const ContactForm = ({ currentContact, isModalVisible, onCreate, onUpdate, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (currentContact) {
            form.setFieldsValue({
                id: currentContact._id,
                fullname: currentContact.name,
                phone1: currentContact.phone1,
                celphone1: currentContact.celphone1,
                address: currentContact.address,
                email: currentContact.email,
            });
        } else {
            form.setFieldsValue(initialFieldsValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentContact]);

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                if (currentContact) {
                    onUpdate(values);
                } else {
                    onCreate(values);
                }
            })
            .catch((info) => {
                console.log('Validación Fallida:', info);
            });
    };

    return (
        <Modal
            title={currentContact ? 'Editar Contacto' : 'Agregar nuevo contacto'}
            visible={isModalVisible}
            okText="Guardar"
            cancelText="Cancelar"
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}
            width={500}
            forceRender
            centered
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Form form={form} name="contactForm" layout="vertical">
                        <Item name="id" hidden={true}>
                            <Input />
                        </Item>

                        <Item
                            name="fullname"
                            label="Nombre Completo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa tu nombre!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Item>

                        <Item
                            name="celphone1"
                            label="Número de Celular"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese su número de celular!',
                                },
                                {
                                    pattern: /^[0-9]+$/,
                                    message: `Por favor ingresa tu número de celular correcto!`,
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Item>

                        <Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa tu email',
                                },
                                {
                                    type: 'email',
                                    message: 'La entrada no es un email válido!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Item>

                        <Item
                            name="address"
                            label="Dirección"
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingresa tu dirección!',
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Item>

                        <Item
                            name="phone1"
                            label="Teléfono"
                            rules={[
                                {
                                    pattern: /^[0-9]+$/,
                                    message: `Por favor ingresa un número de teléfono correcto!`,
                                },
                            ]}
                        >
                            <Input autoComplete="off" />
                        </Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default ContactForm;
