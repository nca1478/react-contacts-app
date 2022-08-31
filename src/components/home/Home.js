// Dependencies
import React, { useContext, useEffect, useState } from 'react';
import { Divider } from 'antd';

// Context
import { AuthContext } from '../../context/auth';

// Styles
const dividerFontSize = { fontSize: '1.3rem' };

const Home = () => {
    const {
        user: { auth },
    } = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div>
            <Divider style={dividerFontSize}>Bienvenido(a) {loaded && auth.user.name}</Divider>
        </div>
    );
};

export default Home;
