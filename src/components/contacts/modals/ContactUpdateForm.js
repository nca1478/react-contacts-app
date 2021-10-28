// Dependencies
import React, { useEffect } from 'react';
import { Form, Input, Modal, Row, Col } from 'antd';

// Antdesign
const { Item } = Form;

const ContactUpdateForm = ({ currentContact, isModalVisible, onUpdate, onCancel }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            id: currentContact._id,
            fullname: currentContact.name,
            phone1: currentContact.phone1,
            celphone1: currentContact.celphone1,
            address: currentContact.address,
            email: currentContact.email,
        });
    }, [currentContact]);

    const onOk = () => {
        form.validateFields()
            .then((values) => {
                form.resetFields();
                onUpdate(values);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Edit Contact"
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
                    <Form form={form} name="contactUpdateForm" layout="vertical">
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

export default ContactUpdateForm;
