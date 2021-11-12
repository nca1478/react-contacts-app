// Dependencies
import React from 'react';
import { Space } from 'antd';

// Icons
import { FormOutlined, DeleteTwoTone } from '@ant-design/icons';

const columns = (isSmallDevice, handleEditClick, handleDeleteClick) => {
    const styleAction = isSmallDevice ? { fontSize: '1.3rem' } : { fontSize: '1.5rem' };

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            responsive: ['md', 'sm', 'xs'],
            width: isSmallDevice && '60%',
            ellipsis: isSmallDevice && true,
            // sorter: (record1, record2) => {
            //     return record1.name > record2.name;
            // },
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
                        <a href="/#">
                            <FormOutlined
                                style={styleAction}
                                onClick={() => handleEditClick(record)}
                            />
                        </a>
                        <a href="/#">
                            <DeleteTwoTone
                                style={styleAction}
                                onClick={() => handleDeleteClick({ id: record._id })}
                            />
                        </a>
                    </Space>
                );
            },
            width: isSmallDevice && '40%',
            responsive: ['md', 'sm', 'xs'],
        },
    ];
};

export default columns;
