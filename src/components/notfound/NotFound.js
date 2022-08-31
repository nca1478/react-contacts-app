import React from 'react';
import { Result, Button } from 'antd';

const NotFound = ({ history }) => {
    const handleClick = () => {
        history.replace('/');
    };

    return (
        <>
            <Result
                status="404"
                title="404"
                subTitle="Lo sentimos, la página que visitaste no existe."
                extra={
                    <Button type="primary" onClick={handleClick}>
                        Ir a Inicio
                    </Button>
                }
            />
        </>
    );
};

export default NotFound;
