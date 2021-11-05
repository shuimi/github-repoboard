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


const App: FC = () => {

    return (
        <Router>
            <AuthModal show={true}/>
            <CommonLayout>
                <Routes>
                    <Route path={ Paths.ABOUT } element={ <About/> }/>
                    <Route path={ Paths.MY_REPOSITORIES } element={ <MyRepositories/> }/>
                    <Route path={ Paths.REPOSITORIES_BOARD } element={ <RepositoriesBoard/> }/>
                </Routes>
            </CommonLayout>
        </Router>
    );
};


export default App;
