import React, { FC, useEffect, useState } from 'react';
import { Col, Divider, Empty, Layout, Menu, Pagination, Row, message } from 'antd';
import RepositoryCard from "../components/repository-card";


const { Header, Footer, Sider, Content } = Layout;

const footerContent = '© Shustov Vladimir, 2021';

const style = { background: '#0092ff', padding: '8px 0' };

const CommonLayout: FC = ({ children }) => {

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

                <Layout>
                    <Header>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={ [ '2' ] }>
                            <Menu.Item key="1">My repositories</Menu.Item>
                            <Menu.Item key="2">Browse repositories</Menu.Item>
                        </Menu>
                    </Header>
                    <Content>
                        { children }
                        <div style={ {
                            minHeight: '280px',
                            padding: '24px',
                            background: '#fff'
                        } } className="site-layout-content">
                            <Divider orientation="left">Responsive</Divider>
                            <Row gutter={ { xs: 1, sm: 2, md: 4, lg: 6 } }>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                                <Col className="gutter-row" span={ 1 }>
                                    <RepositoryCard loading/>
                                </Col>
                            </Row>
                            <Empty description={ false }/>
                            <Pagination total={ 7 } pageSizeOptions={ pageSizeOptions } onChange={ onPageChange }
                                        showSizeChanger/>
                        </div>
                    </Content>
                    <Footer style={ { textAlign: 'center' } }>
                        { footerContent }
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
}

export default CommonLayout;