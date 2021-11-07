import React, { useEffect, useState } from 'react';
import { Divider, Empty, Row, Spin, Statistic } from 'antd';
import { octokit } from '../../client/octokit';
import RepositoryCard from './../common/repository-card';
import useAuth from '../../hooks/auth-hook';
import CallToAuth from './../common/call-to-auth';
import Section from './helpers/section';
import styled from 'styled-components';
import { useMediaQuery } from '../../hooks/media-query-hook';
import { usePagination } from '../../hooks/pagination-hook';
import { Pagination } from '../common/pagination';


const funnyCatImageURL = `https://i.ytimg.com/vi/Zr-qM5Vrd0g/maxresdefault.jpg`;

const StyledStatistic = styled(Statistic)`
    margin: 0.2em 4vw;
    @media (max-width: 520px) {
        margin: 0.3em 5vw;
        font-size: 0.4em;
    }
`;

const UserInfo = (props: { title: string, value?: string }) => {

    let mobile = useMediaQuery('(max-width: 360px)');
    let tablet = useMediaQuery('(max-width: 520px)');

    return (
        <StyledStatistic valueStyle={ {
            fontSize: mobile && '2em' || tablet && '3em' || '2em'
        } } title={ props.title } value={ props.value }/>
    );
}


const Repositories = styled(Row)`
    justify-content: space-evenly;
    margin: 0 10vw;
    @media (max-width: 520px) {
        display: flex;
        margin: 0;
    }
`;


const MyRepositoriesTab = () => {

    const { auth } = useAuth();

    const defaultPageSize = 10;
    const pageSizeOptions = [ '5', `${ defaultPageSize }` ];

    const { pagination, setPagination } = usePagination(defaultPageSize);

    const onPageChange = (page: number, pageSize?: number) => {
        setPagination({ page: page, pageSize: pageSize ?? defaultPageSize });
    }

    const [ repos, setRepos ] = useState<Array<any>>([]);
    const [ fetching, setFetching ] = useState(false);
    const [ totalCount, setTotalCount ] = useState<number>(0);

    useEffect(() => {
        setFetching(true);

        auth.user?.username && octokit.rest.users.getByUsername({
            username: auth.user?.username,
        })
            .then((user) => {
                setTotalCount(user.data.public_repos as number);
            })
            .catch(error => {
                console.log(error);
            });

        auth.user?.username && octokit.rest.repos.listForUser({
            username: auth.user?.username,
            per_page: pagination.pageSize,
            page: pagination.page
        })
            .then(repos => {
                setRepos(repos.data);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setFetching(false);
                console.log(totalCount)
            });

    }, [ auth, pagination ]);


    return (
        <Section>
            {
                auth.status && (
                    <>
                        <Divider orientation='left'>Profile</Divider>
                        <div style={ { display: 'flex' } }>
                            <UserInfo title='Username' value={ auth.user?.username }/>
                            <UserInfo title='Email' value={ auth.user?.email }/>
                        </div>
                        <Divider orientation='left'>Repositories</Divider>
                        {
                            fetching && <Spin/> || (
                                <Repositories gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
                                    {
                                        repos && repos.map(
                                            repo => <RepositoryCard
                                                key={ repo.id }
                                                name={ repo.name }
                                                description={ repo.description }
                                                language={ repo.language }
                                                license={ repo.license && repo.license.name || null }
                                                licenseURL={ repo.license && repo.license.url || null }
                                                imageURL={ auth.user?.avatarURL || funnyCatImageURL }
                                            />
                                        ) || <Empty description={ false }/>
                                    }
                                </Repositories>
                            )
                        }
                        {
                            !fetching && repos && <Pagination
                                total={ totalCount }
                                pageSizeOptions={ pageSizeOptions }
                                onChange={ onPageChange }
                                responsive={ false }
                                showSizeChanger
                                showLessItems
                            />
                        }
                    </>
                ) || <CallToAuth/>
            }
        </Section>
    );
}

export default MyRepositoriesTab;