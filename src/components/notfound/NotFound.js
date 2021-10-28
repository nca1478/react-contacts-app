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
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <Button type="primary" onClick={handleClick}>
                        Go Home
                    </Button>
                }
            />
        </>
    );
};

export default NotFound;
