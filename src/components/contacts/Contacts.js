// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Divider, Button, Table, Space, notification } from 'antd';

// Icons
import { PlusOutlined, FormOutlined } from '@ant-design/icons';

// Api
import { get } from '../../config/api';

// Context
import { AuthContext } from '../../context/auth';

// Styles
import './Contacts.css';
const dividerFontSize = { fontSize: '1.3rem' };

const Contacts = () => {
    const { user } = useContext(AuthContext);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        const { auth } = user;
        setLoading(true);
        await get('/contacts', auth.user.token)
            .then((response) => {
                const data = parseTable(response.data);
                setContacts(data);
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

    const parseTable = (array) => {
        const parsed = array.map((item) => {
            return {
                name: item.name,
                celphone1: item.celphone1,
                email: item.email,
            };
        });
        return parsed;
    };

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
                                onClick={() => handleClick(record)}
                            />
                        </a>
                    </Space>
                );
            },
        },
    ];

    const handleClick = () => {
        alert('Click!!!');
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

            <div className="button-add">
                <Button
                    type="primary"
                    shape="circle"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={handleClick}
                />
            </div>
        </div>
    );
};

export default Contacts;
