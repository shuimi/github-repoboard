import React, { FC, useEffect } from 'react';
import { Modal, Button } from 'antd';
import useAuth from "../services/auth-service";


const AuthModal: FC = () => {

    const { checkUser, signInWithGithub } = useAuth();

    useEffect(() => {
        checkUser();
        window.addEventListener('hashchange', () => {
            checkUser();
        });
    }, []);

    const [ visible, setVisible ] = React.useState(false);
    const [ confirmLoading, setConfirmLoading ] = React.useState(false);
    const [ modalText, setModalText ] = React.useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={ showModal }>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={ visible }
                onOk={ handleOk }
                confirmLoading={ confirmLoading }
                onCancel={ handleCancel }
            >
                <p>{ modalText }</p>

                <div>
                    log into github account to interact your repositories
                    <Button type="primary" onClick={ signInWithGithub }>Login with Github</Button>
                    or try browsing public repositories without authorization
                    <Button type="default">Continue without auth</Button>
                </div>
            </Modal>
        </>
    );
}

export default AuthModal;
