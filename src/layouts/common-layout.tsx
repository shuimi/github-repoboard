import React, { FC, useEffect, useState } from 'react';
import { Button, Layout, Menu, message } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootReducerModel } from '../redux';
import { AuthModel } from '../redux/models';
import useAuth from '../services/auth-hook';
import GithubLogo from '../images/github-logo-white.svg';
import { Paths } from '../paths';
import { AuthButton } from "../components/call-to-auth";


const { Header, Footer, Content } = Layout;
const ResetStyle = { margin: '0', padding: '0', };

const footerContent = '© Shustov Vladimir, 2021';


const CommonLayout: FC = ({ children }) => {

    const auth = useSelector<RootReducerModel>(state => state.auth) as AuthModel;
    const { signOut } = useAuth();


    // const key = 'updatable';
    //
    // const openMessage = () => {
    //     message.loading({ content: 'Loading...', key });
    //     setTimeout(() => {
    //         message.success({ content: 'Loaded!', key, duration: 2 });
    //     }, 1000);
    // };
    //
    // useEffect(() => {
    //     openMessage();
    // }, []);


    const currentLocation = () => {
        let url = window.location.href.split('/');
        return url[url.length - 1];
    }

    return (
        <>
            <Layout style={ ResetStyle }>
                <header style={ { zIndex: 1000 } }>
                    <Menu theme='dark' mode='horizontal' defaultSelectedKeys={ [ currentLocation() ] }>
                        <Menu.Item style={ { backgroundColor: '#3861c6' } } key={ Paths.ABOUT }>
                            <Link to={ Paths.ABOUT }>
                                <img src={ GithubLogo } alt='Github Logo'
                                     style={ {
                                         float: 'left',
                                         height: '3em',
                                         marginTop: '0.1em'
                                     } }
                                />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={ Paths.MY_REPOSITORIES }>
                            <Link to={ Paths.MY_REPOSITORIES }>
                                My repos
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={ Paths.REPOSITORIES_BOARD }>
                            <Link to={ Paths.REPOSITORIES_BOARD }>
                                Browse repos
                            </Link>
                        </Menu.Item>
                    </Menu>
                </header>
                <Content>
                    { children }
                </Content>
                <Footer style={ { textAlign: 'center' } }>
                    { footerContent }
                </Footer>
            </Layout>
        </>
    );
}

export default CommonLayout;