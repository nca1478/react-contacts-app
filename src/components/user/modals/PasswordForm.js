// Dependencies
import React from 'react';
import { Form, Input, Modal, Row, Col } from 'antd';

// Icons
import { LockOutlined } from '@ant-design/icons';

// Antdesign
const { Item } = Form;
const { Password } = Input;

const PasswordForm = ({ isModalVisible, onUpdate, onCancel }) => {
    const [form] = Form.useForm();

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
            title="Enter your Password"
            visible={isModalVisible}
            okText="Send"
            cancelText="Cancel"
            onOk={onOk}
            onCancel={onCancel}
            destroyOnClose={true}
            width={500}
            forceRender
            centered
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Form form={form} name="passwordForm" layout="vertical">
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
                                autoFocus
                            />
                        </Item>
                    </Form>
                </Col>
            </Row>
        </Modal>
    );
};

export default PasswordForm;
