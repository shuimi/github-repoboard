import React, { FC } from 'react';
import CommonLayout from './layouts/common-layout';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import { Paths } from "./paths";
import { NotFound } from "./components/tabs/not-found-tab";
import AuthModal from "./components/common/auth-modal";
import RepositoriesBoardTab from "./components/tabs/repositories-board-tab";
import MyRepositoriesTab from "./components/tabs/my-repositories-tab";
import AboutTab from "./components/tabs/about-tab";


const App: FC = () => {

    return (
        <Router>
            <AuthModal/>
            <CommonLayout>
                <Routes>
                    <Route path={ '/github-repoboard' } element={ <RepositoriesBoardTab/> }/>
                    <Route path={ Paths.ABOUT } element={ <AboutTab/> }/>
                    <Route path={ Paths.MY_REPOSITORIES } element={ <MyRepositoriesTab/> }/>
                    <Route path={ Paths.REPOSITORIES_BOARD } element={ <RepositoriesBoardTab/> }/>
                    <Route path="*" element={ <NotFound/> }/>
                </Routes>
            </CommonLayout>
        </Router>
    );
};


export default App;
