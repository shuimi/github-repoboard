import React, { useEffect, useState } from 'react';
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
            <div style={ {
                display: 'flex',
                flexDirection: 'column',
                margin: '1rem',
                minHeight: 'min(50vw, 30vh)',
                alignItems: 'center',
                paddingBottom: '2rem',
            } }>
                <div style={ {
                    fontSize: 'max(2vw, 20px)',
                    textAlign: 'center',
                    paddingTop: '2rem',
                } }>
                    <img src={ GithubLogo } alt="Github Logo"
                         style={ {
                             width: 'max(14vw, 140px)',
                         } }
                    />
                    <span style={ {
                        display: 'block',
                        paddingBottom: '1em'
                    } }>
                            RepoBoard
                        </span>
                </div>
                <span style={ {
                    fontSize: '1.15em',
                    textAlign: 'center',
                } }>
                        Log into github account to interact your repositories:
                    </span>
                <Button style={ {
                    marginTop: '1em',
                    marginBottom: '3em',
                    width: '14rem',
                } } type="primary" onClick={ signInWithGithub }>Sign in via Github</Button>
                <span style={ {
                    fontSize: '1.15em',
                    textAlign: 'center',
                } }>
                        Or try browsing public repositories without authorization:
                    </span>
                <Button style={ {
                    marginTop: '1em',
                    marginBottom: '1em',
                    width: '14rem',
                } } type="default">Continue without auth</Button>
            </div>
        </Modal>
    );
}

export default AuthModal;
