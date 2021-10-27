// Dependencies
import React from 'react';
import { Form, Input, Modal, Typography, Row, Col } from 'antd';

// Antdesign
const { Item } = Form;

const ContactForm = ({ isModalVisible, onCreate, onCancel }) => {
    const [form] = Form.useForm();

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onCreate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Add New Contact"
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

                        <Item name="phone1" label="Phone">
                            <Input />
                        </Item>

                        <Item
                            name="celphone1"
                            label="Celphone"
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
