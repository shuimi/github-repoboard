import React, { useEffect } from 'react';
import { Modal, Button } from 'antd';
import useAuth from "../services/auth-service";
import GithubLogo from './../images/github-logo.svg';


const AuthModal = (props: { show: boolean }) => {

    const { checkUser, signInWithGithub } = useAuth();

    useEffect(() => {
        checkUser();
        window.addEventListener('hashchange', () => {
            checkUser();
        });
    }, []);

    const [ visible, setVisible ] = React.useState(props.show);
    const [ confirmLoading, setConfirmLoading ] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {

        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <>
            <Modal
                visible={ visible }
                confirmLoading={ confirmLoading }
                onCancel={ handleCancel }
                footer={ null }
                centered
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '1rem',
                    minHeight: 'min(50vw, 30vh)',
                    alignItems: 'center',
                    paddingBottom: '2rem',
                }}>
                    <div style={{
                        fontSize: 'max(2vw, 20px)',
                        textAlign: 'center',
                        paddingTop: '2rem',
                    }}>
                        <img src={ GithubLogo } alt="Github Logo"
                             style={{
                                 width: 'min(14vw, 280px)',
                             }}
                        />
                        <span style={{
                            display: 'block',
                            paddingBottom: '1em'
                        }}>
                            RepoBoard
                        </span>
                    </div>
                    log into github account to interact your repositories
                    <Button style={{
                        marginTop: '1em',
                        marginBottom: '1em',
                    }} type="primary" onClick={ signInWithGithub }>Sign in via Github</Button>
                    or try browsing public repositories without authorization
                    <Button style={{
                        marginTop: '1em',
                        marginBottom: '1em',
                    }} type="default">Continue without auth</Button>
                </div>
            </Modal>
        </>
    );
}

export default AuthModal;
