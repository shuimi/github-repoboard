import React, { useEffect, useState } from "react";
import { Col, Divider, Empty, Input, Pagination, Row, Spin } from "antd";
import RepositoryCard from "./repository-card";
import { octokit } from "../services/octokit";


const ReposBrowser = () => {

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


    const [ repos, setRepos ] = useState<{
        totalCount: number, items?: Array<any> | null
    }>({
        totalCount: 0,
        items: null
    });

    const [ searchQuery, setSearchQuery ] = useState<string>('');

    const onSearchInput = (value: string) => {
        setSearchQuery(value);
    }

    const [ fetching, setFetching ] = useState(false);
    const [ fetchingError, setFetchingError ] = useState('');

    useEffect(() => {
        searchQuery && setFetching(true) || setRepos({ totalCount: 0, items: null });
        searchQuery && octokit.rest.search.repos({
            q: searchQuery.split(' ').reduce((aggregation, topic) => aggregation += `topic:${ topic }+`),
            order: 'asc',
            per_page: pagination.pageSize,
            page: pagination.page
        })
            .then(repos => {
                console.log(repos);
                setRepos({ totalCount: repos.data.total_count, items: repos.data.items && repos.data.items || null });
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFetching(false);
            });
    }, [ searchQuery, pagination ]);

    return (
        <section style={ {
            height: '100%',
            padding: '2em',
            margin: '0',
        } }>
            <Input.Search onSearch={ onSearchInput } size="large"
                          placeholder="Search for repos"/>
            <Divider orientation="left">{ repos && 'Found: ' + repos.totalCount || 'Repositories' }</Divider>
            <Row style={ {
                justifyContent: 'center',
            } } gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
                { fetching && <Spin/> }
                {
                    repos.items
                    && repos.items.map(repo => <RepositoryCard key={ repo.id } name={ repo.name } loading={ false }/>)
                    ||
                    !fetching
                    && <Empty description={ false }/>
                }
            </Row>
            Only first 1000 results available ({ 1000 / pagination.pageSize } pages)
            {
                repos.items && repos.items.length > 1 &&
                <Pagination total={ repos.totalCount >= 1000 ? 1000 : repos.totalCount }
                            pageSizeOptions={ pageSizeOptions }
                            onChange={ onPageChange }
                            showSizeChanger/>
            }

        </section>
    );
}

export default ReposBrowser;