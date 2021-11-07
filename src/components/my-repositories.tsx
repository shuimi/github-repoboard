import React, { useEffect, useState } from 'react';
import { Divider, Empty, Row, Statistic } from 'antd';
import { octokit } from '../hooks/octokit';
import RepositoryCard from './repository-card';
import useAuth from '../hooks/auth-hook';
import CallToAuth from './call-to-auth';
import Section from './section';
import styled from "styled-components";
import { useMediaQuery } from "../hooks/media-query-hook";


const funnyCatImageURL = `https://i.ytimg.com/vi/Zr-qM5Vrd0g/maxresdefault.jpg`;


const UserInfo = (props: { title: string, value?: string }) => {

    const StyledStatistic = styled(Statistic)`
        margin: 0.2em 4vw;
        @media (max-width: 520px) {
            margin: 0.3em 5vw;
            font-size: 0.4em;
        }
    `;

    let mobile = useMediaQuery('(max-width: 360px)');
    let tablet = useMediaQuery('(max-width: 520px)');

    return (
        <StyledStatistic valueStyle={ {
            fontSize: mobile && '2em' || tablet && '3em' || '2em'
        } } title={ props.title } value={ props.value }/>
    );
}

const MyRepositories = () => {

    const { auth, secret } = useAuth();

    const [ repos, setRepos ] = useState<Array<any>>([]);

    useEffect(() => {
        auth.user?.username && octokit.rest.repos.listForUser({
            username: auth.user?.username
        })
            .then(repos => {
                setRepos(repos.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [ auth ]);


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
                        <Row style={ {
                            justifyContent: 'space-evenly',
                            margin: '0 10vw',
                        } } gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
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
                        </Row>
                    </>
                ) || <CallToAuth/>
            }
        </Section>
    );
}

export default MyRepositories;