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
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title={currentContact ? 'Edit Contact' : 'Add New Contact'}
            visible={isModalVisible}
            okText="Save"
            cancelText="Cancel"
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}
            width={500}
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
                            label="Fullname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your name!',
                                },
                            ]}
                        >
                            <Input />
                        </Item>

                        <Item
                            name="celphone1"
                            label="Cellphone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your celphone!',
                                },
                            ]}
                        >
                            <Input />
                        </Item>

                        <Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your address!',
                                },
                            ]}
                        >
                            <Input />
                        </Item>

                        <Item name="phone1" label="Phone">
                            <Input />
                        </Item>

                        <Item name="email" label="Email">
                            <Input />
                        </Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default ContactForm;
