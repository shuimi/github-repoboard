import React, { FC } from 'react';
import CommonLayout from './layouts/common-layout';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import RepositoriesBoard from './components/repositories-board';
import MyRepositories from './components/my-repositories';
import AuthModal from "./components/auth-modal";
import About from "./components/about";
import { Paths } from "./paths";
import { NotFound } from "./components/not-found-error";


const App: FC = () => {

    return (
        <Router>
            <AuthModal/>
            <CommonLayout>
                <Routes>
                    <Route path={ '/github-repoboard' } element={ <RepositoriesBoard/> }/>
                    <Route path={ Paths.ABOUT } element={ <About/> }/>
                    <Route path={ Paths.MY_REPOSITORIES } element={ <MyRepositories/> }/>
                    <Route path={ Paths.REPOSITORIES_BOARD } element={ <RepositoriesBoard/> }/>
                    <Route path="*" element={ <NotFound/> }/>
                </Routes>
            </CommonLayout>
        </Router>
    );
};


export default App;
