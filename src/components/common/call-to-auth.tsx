import React, { memo } from 'react';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import GithubLogo from '../../images/github-logo.svg';
import { Paths } from '../../paths';
import useAuth from '../../hooks/auth-hook';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1rem;
    min-height: min(50vw, 30vh);
    align-items: center;
    padding-bottom: 2rem;
    max-height: 70vh;
`;

const Text = styled.span({
    display: 'block',
    paddingBottom: '1em'
});

const Logo = styled.img({
    width: 'max(14vw, 140px)'
});

const CompositeLogo = styled.div({
    fontSize: 'max(2vw, 20px)',
    textAlign: 'center',
    paddingTop: '1rem',
});

export const AuthButton = styled(Button)({
    marginTop: '1em',
    marginBottom: '1em',
    width: '14rem',
});

const CentredText = styled.span<{ fontSize: number }>((props) => ({
    fontSize: `${ props.fontSize }em`,
    textAlign: 'center',
}));


const CallToAuth = memo((props: { closeModelCallback?: any }) => {

    const { signInWithGithub } = useAuth();

    const navigate = useNavigate();

    const onContinueAsGuest = () => {
        props.closeModelCallback && props.closeModelCallback();
        navigate(Paths.REPOSITORIES_BOARD);
    }

    return (
        <Wrapper>
            <CompositeLogo>
                <Logo src={ GithubLogo } alt='Github Logo'/>
                <Text>
                    RepoBoard
                </Text>
            </CompositeLogo>
            <CentredText fontSize={ 1.15 }>
                Log into github account to interact your repositories:
            </CentredText>
            <AuthButton type='primary' onClick={ signInWithGithub }>Sign in via Github</AuthButton>
            <CentredText fontSize={ 1 }>
                Or try browsing public repositories without authorization:
            </CentredText>
            <AuthButton type='dashed' onClick={ onContinueAsGuest }>Continue without auth</AuthButton>
            <Link onClick={ props.closeModelCallback } to={ Paths.ABOUT }>
                Also you can read more about this app
            </Link>
        </Wrapper>
    );
});

export default CallToAuth;