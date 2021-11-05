import React, { FC, useEffect, useState } from 'react';
import { Layout, Menu, message } from 'antd';
import AuthModal from "../components/auth-modal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducerModel } from "../redux";
import { AuthModel } from "../redux/models";
import useAuth from "../services/auth-service";


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
            <Layout>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ [ '2' ] }>
                        <Menu.Item key="1">
                            <Link to="/me">
                                My repositories
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/repoboard">
                                Browse repositories
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content>
                    <AuthModal show={true}></AuthModal>
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