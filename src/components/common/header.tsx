import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'antd';
import { useMediaQuery } from '../../hooks/media-query-hook';
import { MenuOutlined } from '@ant-design/icons';
import { Paths } from '../../paths';
import React, { memo } from 'react';
import GithubLogo from '../../images/github-logo-white.svg';


const StyledHeader = styled.header({
    zIndex: 100,
    position: 'fixed',
    width: '100%',
    background: '#2d333b',
    overflow: 'hidden',
    paddingLeft: '4vw',
    paddingRight: '4vw',
});


const Item = styled(Link)`
    display: block;
    background: #2d333b;
    float: left;
    text-align: center;
    padding: 0.8em;
    text-decoration: none;
    color: white;
        &:hover {
        background: #4b5562;
        color: white;
    }
    &:active {
        background: #4b5562;
        color: white;
    }
`;

const AuthButton = styled(Button)`
    background: #2d333b;
    float: right;
    text-align: center;
    border: 0.1em solid #696969;
    margin: 0.4em 1em;
    color: white;
    &:hover {
        background: #4b5562;
        color: white;
        border: 0.1em solid white;
    }
    &:active {
        background: #4b5562;
        color: white;
        border: 0.1em solid white;
    }
`;

const Logo = styled.img({
    float: 'left',
    height: '3em',
    margin: '0.05em 1em',
});

const Username = styled.div`
    float: right;
    text-align: center;
    margin: 0.8em 0.2em;
    color: white;
`;

const MobileMoreButton = styled(Dropdown)`
    margin: 0.4em;
    color: white;
    float: right;
    &:focus {
        color: #4b5562;
    }
`;

export const Header = memo((props: {
    authStatus: boolean,
    username: string | undefined,
    signOutCallback: () => void,
    signInCallback: () => void
}) => {

    const isSmallDevice = useMediaQuery('(max-width: 520px)');
    const isExtraSmallDevice = useMediaQuery('(max-width: 340px)');
    const isMinimumSize = useMediaQuery('(max-width: 260px)');

    const MobileMenu = () => {
        return (
            <MobileMoreButton overlay={ menu } placement='bottomRight'>
                <Button type='text' icon={ <MenuOutlined/> }/>
            </MobileMoreButton>
        );
    }

    const menu = (
        <Menu>
            {
                isSmallDevice
            }
            <Menu.Item>
                <Link to={ Paths.ABOUT }>
                    About
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ Paths.MY_REPOSITORIES }>
                    My repos
                </Link>
            </Menu.Item>
            <Menu.Item>
                <Link to={ Paths.REPOSITORIES_BOARD }>
                    Browse repos
                </Link>
            </Menu.Item>
            {
                props.authStatus &&
                <Menu.Item onClick={ props.signOutCallback }>
                    Sign out
                </Menu.Item> ||
                <Menu.Item onClick={ props.signInCallback }>
                    Sign via github
                </Menu.Item>
            }

        </Menu>
    );

    return (
        <StyledHeader>
            {
                !isExtraSmallDevice &&
                <Link to={ Paths.ABOUT }>
                    <Logo src={ GithubLogo } alt='Github Logo'/>
                </Link>
            }
            {
                !isMinimumSize && (
                    <>
                        <Item to={ Paths.MY_REPOSITORIES }>
                            My repos
                        </Item>
                        <Item to={ Paths.REPOSITORIES_BOARD }>
                            Browse repos
                        </Item>
                    </>
                )
            }
            {
                isMinimumSize && <MobileMenu/> || (
                    isSmallDevice && <MobileMenu/> || (
                        props.authStatus &&
                        <AuthButton onClick={ props.signOutCallback }>
                            Sign out
                        </AuthButton> ||
                        <AuthButton onClick={ props.signInCallback }>
                            Sign via github
                        </AuthButton>
                    )
                )
            }
            {
                props.authStatus && !isSmallDevice && <Username>@{ props.username }</Username>
            }
        </StyledHeader>
    );
});