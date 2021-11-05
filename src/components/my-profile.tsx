import React, { useEffect, useState } from "react";
import { Divider, Empty, Input, Pagination, Row } from "antd";
import { octokit } from "../services/octokit";
import RepositoryCard from "./repository-card";


const MyProfile = () => {

    const defaultPageSize = 10;
    const pageSizeOptions = [ '5', `${ defaultPageSize }` ];

    const [ pagination, setPagination ] = useState<{
        page: number,
        pageSize: number
    }>({
        page: 1,
        pageSize: defaultPageSize
    });

    const onPageChange = (page: number, pageSize?: number) => {
        setPagination({ page: page, pageSize: pageSize ?? defaultPageSize });
    }


    const [ repos, setRepos ] = useState<Array<any>>([]);

    useEffect(() => {

        octokit.rest.repos.listForUser({
            username: 'shuimi'
        })
            .then(repos => {
                setRepos(repos.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);


    return (
        <section style={ {
            height: '100%',
            padding: '2em',
            margin: '0',
        } }>
            <Divider orientation="left">Repositories</Divider>
            <Row style={ {
                justifyContent: 'center',
            } } gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
                {
                    repos
                    && repos.map(repo => <RepositoryCard key={ repo.id } name={ repo.name } loading={ false }/>)
                    || <Empty description={ false }/>
                }
            </Row>
            <Pagination total={ 7 } pageSizeOptions={ pageSizeOptions } onChange={ onPageChange } showSizeChanger/>
        </section>
    );
}

export default MyProfile;