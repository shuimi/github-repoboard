import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import CallToAuth from './call-to-auth';
import useAuth from '../../hooks/auth-hook';


const AuthModal = () => {

    const [ visible, setVisible ] = useState(false);
    const { auth } = useAuth();

    useEffect(() => {
        setVisible(!auth.status);
    }, [ auth.status ])

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal visible={ visible } onCancel={ handleCancel } footer={ null } centered>
            <CallToAuth closeModelCallback={ handleCancel }/>
        </Modal>
    );
}

export default AuthModal;
