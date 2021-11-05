import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, message } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducerModel } from "../redux";
import { AuthModel } from "../redux/models";
import useAuth from "../services/auth-service";
import GithubLogo from "../images/github-logo-white.svg";
import { Paths } from "../paths";


const { Header, Footer, Content } = Layout;

const footerContent = '© Shustov Vladimir, 2021';

const style = { background: '#0092ff', padding: '8px 0' };

const CommonLayout: FC = ({ children }) => {

    const auth = useSelector<RootReducerModel>(state => state.auth) as AuthModel;
    const { signOut } = useAuth();

    const [ page, setPage ] = useState<number>(1);

    const onPageChange = (page: number, pageSize?: number) => {
        setPage(page);
    }

    const pageSizeOptions = [ '5', '10' ];


    const key = 'updatable';

    const openMessage = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Loaded!', key, duration: 2 });
        }, 1000);
    };

    useEffect(() => {
        openMessage();
    }, []);


    return (
        <>
            <Layout style={ {
                margin: '0',
                padding: '0',
            } }>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ [ '1' ] }>
                        <Menu.Item style={ { backgroundColor: '#4320a2' } } key="0">
                            <Link to={ Paths.ABOUT }>
                                <img src={ GithubLogo } alt="Github Logo"
                                     style={ {
                                         float: 'left',
                                         height: '3.5rem',
                                         marginLeft: '0vw',
                                         marginRight: '0vw',
                                         marginTop: '0.2em'
                                     } }
                                />
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Link to={ Paths.MY_REPOSITORIES }>
                                My repos
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to={ Paths.REPOSITORIES_BOARD }>
                                Browse repos
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
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