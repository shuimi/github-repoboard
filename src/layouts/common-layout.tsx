import React, { FC } from 'react';
import styled from 'styled-components';
import useAuth from '../hooks/auth-hook';
import { Header } from '../components/common/header';


const Content = styled.div({
    display: 'block',
    margin: '0',
    paddingTop: '3em',
});


const CommonLayout: FC = ({ children }) => {

    const { signInWithGithub, signOut, auth } = useAuth();


    return (
        <>
            <Header username={ auth.user?.username }
                    authStatus={ auth.status }
                    signInCallback={ signInWithGithub }
                    signOutCallback={ signOut }/>
            <Content>
                { children }
            </Content>
        </>
    );
}

export default CommonLayout;