import React, { useEffect, useState } from "react";
import { Empty, Row } from "antd";
import { octokit } from "../services/octokit";
import RepositoryCard from "./repository-card";
import useAuth from "../services/auth-hook";
import CallToAuth from "./call-to-auth";
import Section from "./section";


const MyRepositories = () => {

    const { signInWithGithub, auth } = useAuth();

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
        <Section>
            <Row style={ {
                justifyContent: 'center',
            } } gutter={ { xs: 1, sm: 2, md: 3, lg: 3 } }>
                {/*{*/}
                {/*    auth.status*/}
                {/*    &&(*/}
                {/*        repos*/}
                {/*        && repos.map(repo => <RepositoryCard key={ repo.id } name={ repo.name } loading={ false }/>)*/}
                {/*        || <Empty description={ false }/>*/}
                {/*    )*/}
                {/*    ||(*/}
                {/*        <CallToAuth continueAsGuestCallback={()=>{}}*/}
                {/*                    signInCallback={signInWithGithub}/>*/}
                {/*    )*/}
                {/*}*/}
            </Row>

        </Section>
    );
}

export default MyRepositories;