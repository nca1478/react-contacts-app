// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, notification, Modal, Input, Divider } from 'antd';
import { useMediaQuery } from 'react-responsive';

// Icons
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// Api
import { get, post, put, del } from '../../config/api';

// Context
import { AuthContext } from '../../context/auth';

// Modals
import ContactForm from './modal/ContactForm';

// Table Columns Settings
import columns from './table/columns';

// Antdesing
const { confirm } = Modal;
const { Search } = Input;

// Styles
const dividerFontSize = { fontSize: '1.5rem' };

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
    const isSmallDevice = useMediaQuery({ query: '(max-width: 576px)' });

    useEffect(() => {
        fetchCountContacts();
        fetchContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCountContacts = async () => {
        await get('/contacts/count', auth.user.token)
            .then((response) => {
                setTotalPages(response.data);
            })
            .catch((error) => {
                console.log(error);
                notification['error']({
                    message: 'Ha ocurrido un error',
                    description: 'Error al intentar contar contactos de la base de datos.',
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
                    message: 'Se ha producido un error',
                    description: 'Error al intentar obtener contactos de la base de datos.',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchContactsByName = async (name) => {
        setLoading(true);
        await post('/contacts/search', { name }, auth.user.token)
            .then((response) => {
                setContacts(response.data);
                fetchCountContacts();
            })
            .catch((error) => {
                console.log(error);
                notification['error']({
                    message: 'Se ha producido un error',
                    description: 'Error al intentar obtener contactos de la base de datos.',
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
                        description: 'Error al intentar crear el contacto en la base de datos.',
                    });
                } else {
                    notification['success']({
                        message: 'Operación Exitosa',
                        description: 'Contacto creado con éxito.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error al intentar crear un contacto en la base de datos.',
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
                        description:
                            'Error al intentar actualizar el contacto en la base de datos.',
                    });
                } else {
                    notification['success']({
                        message: 'Operación Exitosa',
                        description: 'Contacto actualizado correctamente.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error al intentar actualizar el contacto en la base de datos.',
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
                        description: 'Error al intentar eliminar el contacto en la base de datos.',
                    });
                } else {
                    notification['success']({
                        message: 'Operación Exitosa',
                        description: 'Contacto eliminado con éxito.',
                    });
                    fetchContacts(page);
                }
            })
            .catch((error) => {
                notification['error']({
                    message: 'Error',
                    description: 'Error al intentar eliminar el contacto en la base de datos.',
                });
                console.log(error);
            });
    };

    const showConfirm = (id) => {
        confirm({
            title: 'Advertencia',
            icon: <ExclamationCircleOutlined />,
            content: '¿Quieres eliminar este contacto?',
            onOk() {
                onDelete(id);
            },
            onCancel() {
                console.log('Borrado Cancelado!');
            },
            centered: true,
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

    const onSearch = (value) => {
        fetchContactsByName(value);
    };

    // Get Table Columns Settings
    const cols = columns(isSmallDevice, handleEditClick, handleDeleteClick);

    return (
        <div>
            <Divider style={dividerFontSize}>Contactos de {auth.user.name.split(' ', 1)}</Divider>

            <div className="box-filtering">
                <Search
                    autoFocus
                    placeholder="Ingrese nombre del contacto"
                    allowClear
                    enterButton="Buscar"
                    // size="large"
                    onSearch={onSearch}
                    className="search"
                />
            </div>

            <Table
                columns={cols}
                dataSource={contacts}
                loading={loading}
                rowKey="_id"
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
