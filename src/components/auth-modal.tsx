import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import useAuth from "../services/auth-hook";
import GithubLogo from './../images/github-logo.svg';
import CallToAuth from "./call-to-auth";


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
            <CallToAuth continueAsGuestCallback={()=>{}}
                        signInCallback={signInWithGithub}/>
        </Modal>
    );
}

export default AuthModal;
