import React, { FC, useEffect, useState } from 'react';
import { Octokit } from 'octokit';
import { Pagination, Empty } from 'antd';
import AuthModal from "./components/auth-modal";
import { useSelector } from "react-redux";
import { RootReducerModel } from "./redux";
import { AuthModel } from "./redux/models";
import useAuth from "./services/auth-service";
import CommonLayout from "./layouts/common-layout";


const App: FC = () => {

    const [ page, setPage ] = useState<number>(1);

    const onPageChange = (page: number, pageSize?: number) => {
        setPage(page);
    }

    const pageSizeOptions = [ '5', '10' ];

    const [ repos, setRepos ] = useState<Array<any>>([]);

    const octokit = new Octokit();

    //
    // useEffect(()=>{
    //     user && octokit.rest.repos.listForUser({
    //         // @ts-ignore
    //         username: user.user_metadata.user_name
    //     })
    //         .then(repos => {
    //             // @ts-ignore
    //             const data = repos.data;
    //             console.log(data);
    //             setRepos(data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, [user]);

    const auth = useSelector<RootReducerModel>(state => state.auth) as AuthModel;
    const { signOut } = useAuth();

    return (
        <>
            <CommonLayout>
                <AuthModal></AuthModal>
                children
            </CommonLayout>
            {/*{ auth && auth.status && <button onClick={signOut}>sign out</button> || <AuthPage/> }*/}
            {/*{*/ }
            {/*    repos && repos.map(*/ }
            {/*        (repo: any) => {*/ }
            {/*            return <p key={ repo.node_id }>{ repo.name }</p>;*/ }
            {/*        }*/ }
            {/*    )*/ }
            {/*}*/ }
            {/*{ page }*/ }
        </>
    );
};

export default App;
