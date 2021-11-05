import React, { useEffect, useState } from "react";
import { Col, Divider, Empty, Pagination, Row } from "antd";
import RepositoryCard from "./repository-card";
import { Octokit } from "octokit";


const ReposBrowser = () => {

    const [ page, setPage ] = useState<number>(1);

    const onPageChange = (page: number, pageSize?: number) => {
        setPage(page);
    }

    const pageSizeOptions = [ '5', '10' ];

    const [ repos, setRepos ] = useState<Array<any>>([]);

    const octokit = new Octokit();

    useEffect(() => {

        octokit.rest.repos.listForUser({
            username: 'shuimi'
        })
            .then(repos => {
                setRepos(repos.data);
            })
            .catch(error => {
                console.log(error);
            })

    }, []);

    return (
        <>
            <div style={ {
                minHeight: '280px',
                padding: '24px',
                background: '#fff'
            } } className="site-layout-content">
                <Divider orientation="left">Responsive</Divider>
                <Row gutter={ { xs: 1, sm: 2, md: 4, lg: 6 } }>
                    {
                        repos && repos.map(repo => <RepositoryCard name={ repo.name } loading={ false }/>)
                    }
                </Row>
                <Empty description={ false }/>
                <Pagination total={ 7 } pageSizeOptions={ pageSizeOptions } onChange={ onPageChange }
                            showSizeChanger/>
            </div>
        </>
    );
}

export default ReposBrowser;