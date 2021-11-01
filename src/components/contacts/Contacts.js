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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        fetchCountContacts();
        fetchContacts();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['md', 'sm', 'xs'],
        },
        {
            title: 'Cellphone',
            dataIndex: 'celphone1',
            key: 'celphone1',
            responsive: ['md'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            responsive: ['md'],
        },
        {
            title: 'Action',
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
            responsive: ['md', 'sm', 'xs'],
        },
    ];

    const fetchCountContacts = async () => {
        await get('/contacts/count', auth.user.token)
            .then((response) => {
                setTotalPages(response.data);
            })
            .catch((error) => {
                console.log(error);
                notification['error']({
                    message: 'An error has occurred',
                    description: 'Error trying to count contacts from the database.',
                });
            });
    };

    const fetchContacts = async (p = 1) => {
        setLoading(true);
        await get(`/contacts?page=${p}`, auth.user.token)
            .then((response) => {
                setContacts(response.data);
                fetchCountContacts();
            })
            .catch((error) => {
                console.log(error);
                notification['error']({
                    message: 'An error has occurred',
                    description: 'Error trying to get contacts from the database.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
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
                        description: 'Error trying to creating contact into the database.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully created.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error trying to creating contact into the database.',
                });
                console.log(error);
            })
            .finally(() => {
                setIsModalVisible(false);
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
                        description: 'Error trying to updating contact into the database.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully updated.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error trying to updating contact into the database.',
                });
                console.log(error);
            });
        setIsModalVisible(false);
    };

    const onDelete = async (id) => {
        await del(`/contacts/${id}`, auth.user.token)
            .then((response) => {
                if (response.data === null) {
                    notification['error']({
                        message: 'Error',
                        description: 'Error trying to deleting contact into the database.',
                    });
                } else {
                    notification['success']({
                        message: 'Success Operation',
                        description: 'Contact successfully deleted.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error trying to deleting contact into the database.',
                });
                console.log(error);
            });
    };

    const showConfirm = (id) => {
        confirm({
            title: 'Warning',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete this contact?',
            onOk() {
                onDelete(id);
            },
            onCancel() {
                console.log('Cancel Delete!');
            },
        });
    };

    const onCancel = () => {
        setIsModalVisible(false);
        setCurrentContact(null);
    };

    const handleAddClick = () => {
        setIsModalVisible(true);
        setCurrentContact(null);
    };

    const handleEditClick = (record) => {
        setIsModalVisible(true);
        setCurrentContact(record);
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
                pagination={{
                    position: ['none', 'bottomLeft'],
                    current: page,
                    pageSize,
                    total: totalPages,
                    onChange: async (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                        await fetchContacts(page);
                    },
                }}
            />

            <ContactForm
                currentContact={currentContact}
                isModalVisible={isModalVisible}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onCancel={onCancel}
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
