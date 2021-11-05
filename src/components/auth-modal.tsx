import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import useAuth from "../services/auth-service";
import GithubLogo from './../images/github-logo.svg';
import AuthForm from "./auth-form";


const AuthModal = (props: { show: boolean }) => {

    const { checkUser, signInWithGithub } = useAuth();

    useEffect(() => {
        checkUser();
        window.addEventListener('hashchange', () => {
            checkUser();
        });
    }, []);

    const [ visible, setVisible ] = useState(props.show);

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <Modal
            visible={ visible }
            onCancel={ handleCancel }
            footer={ null }
            centered
        >
            <AuthForm continueAsGuestCallback={()=>{}}
                      signInCallback={signInWithGithub}/>
        </Modal>
    );
}

export default AuthModal;
