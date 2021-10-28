// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Divider, Button, Table, Space, notification, Modal } from 'antd';

// Icons
import {
    PlusOutlined,
    FormOutlined,
    DeleteTwoTone,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

// Api
import { get, post, put, del } from '../../config/api';

// Context
import { AuthContext } from '../../context/auth';

// Modals
import ContactForm from './modals/ContactForm';
import ContactUpdateForm from './modals/ContactUpdateForm';

// Styles
import './Contacts.css';
const dividerFontSize = { fontSize: '1.3rem' };

// Antdesing
const { confirm } = Modal;

const Contacts = () => {
    const {
        user: { auth },
    } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentContact, setCurrentContact] = useState({});
    const [isModalVisibleCF, setIsModalVisibleCF] = useState(false);
    const [isModalVisibleCUF, setIsModalVisibleCUF] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Celphone',
            dataIndex: 'celphone1',
            key: 'celphone1',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (record) => {
                return (
                    <Space size="middle">
                        <a>
                            <FormOutlined
                                style={{ fontSize: 25 }}
                                onClick={() => handleEditClick(record)}
                            />
                        </a>
                        <a>
                            <DeleteTwoTone
                                style={{ fontSize: 25 }}
                                onClick={() => handleDeleteClick({ id: record._id })}
                            />
                        </a>
                    </Space>
                );
            },
        },
    ];

    const fetchContacts = async () => {
        setLoading(true);
        await get('/contacts', auth.user.token)
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => {
                console.log(error);
                notification['error']({
                    message: 'An error has occurred',
                    description: 'Error trying to get data from the database.',
                });
            });
        setLoading(false);
    };

    const onCreate = async (data) => {
        const dataContact = {
            name: data.fullname,
            phone1: data.phone1,
            celphone1: data.celphone1,
            address: data.address,
            email: data.email,
        };

        await post('/contacts', dataContact, auth.user.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Please verify the data entered and try again.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully created.',
                    });
                    fetchContacts();
                    setIsModalVisibleCF(false);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Please verify the data entered and try again.',
                });
                console.log(error);
            });
    };

    const onUpdate = async (data) => {
        const dataContact = {
            id: data.id,
            name: data.fullname,
            phone1: data.phone1,
            celphone1: data.celphone1,
            address: data.address,
            email: data.email,
        };

        await put(`/contacts/${dataContact.id}`, dataContact, auth.user.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Please verify the data entered and try again.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully updated.',
                    });
                    fetchContacts();
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Please verify the data entered and try again.',
                });
                console.log(error);
            });
        setIsModalVisibleCUF(false);
    };

    const onDelete = async (id) => {
        await del(`/contacts/${id}`, auth.user.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error deleting the register, Try again!',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully deleted.',
                    });
                    fetchContacts();
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error deleting the register, Try again!',
                });
                console.log(error);
            });
    };

    const showConfirm = (id) => {
        confirm({
            title: 'Warning',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you Want to delete this contact?',
            onOk() {
                onDelete(id);
            },
            onCancel() {
                console.log('Cancel Delete!');
            },
        });
    };

    const onCancelCF = () => {
        setIsModalVisibleCF(false);
    };

    const onCancelCUF = () => {
        setIsModalVisibleCUF(false);
        setCurrentContact({});
    };

    const handleEditClick = (record) => {
        setIsModalVisibleCUF(true);
        setCurrentContact(record);
    };

    const handleAddClick = () => {
        setIsModalVisibleCF(true);
    };

    const handleDeleteClick = ({ id }) => {
        showConfirm(id);
    };

    return (
        <div>
            <Divider style={dividerFontSize}>Contacts</Divider>

            <Table
                columns={columns}
                dataSource={contacts}
                loading={loading}
                rowKey="id"
                pagination={{ position: ['none', 'bottomLeft'] }}
            />

            <ContactForm
                isModalVisible={isModalVisibleCF}
                onCreate={onCreate}
                onCancel={onCancelCF}
            />

            <ContactUpdateForm
                currentContact={currentContact}
                isModalVisible={isModalVisibleCUF}
                onUpdate={onUpdate}
                onCancel={onCancelCUF}
            />

            <div className="button-add">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={handleAddClick}
                />
            </div>
        </div>
    );
};

export default Contacts;
