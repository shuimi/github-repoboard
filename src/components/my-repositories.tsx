import React, { useEffect, useState } from "react";
import { Empty, Row } from "antd";
import { octokit } from "../hooks/octokit";
import RepositoryCard from "./repository-card";
import useAuth from "../hooks/auth-hook";
import CallToAuth from "./call-to-auth";
import Section from "./section";


const MyRepositories = () => {

    const { auth, secret } = useAuth();

    const [ repos, setRepos ] = useState<Array<any>>([]);

    useEffect(() => {

        // octokit.rest.repos.listForAuthenticatedUser({})
        //     .then(repos => {
        //         setRepos(repos.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });

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
            <Row style={ {
                justifyContent: 'center',
            } } gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
                {
                    auth.status
                    &&(
                        repos
                        && repos.map(
                            repo => <RepositoryCard
                                key={ repo.id }
                                name={ repo.name }
                                description={ repo.description }
                                language={ repo.language }
                                license={ repo.license && repo.license.name || null }
                                licenseURL={ repo.license && repo.license.url || null }
                                imageURL={ repo.name }
                            />
                        )
                        || <Empty description={ false }/>
                    )
                    ||<CallToAuth/>
                }
            </Row>

        </Section>
    );
}

export default MyRepositories;