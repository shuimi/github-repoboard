import React, { FC } from 'react';
import CommonLayout from './layouts/common-layout';

import {
    BrowserRouter as Router,
    Route,
    Routes, useLocation
} from 'react-router-dom';

import RepositoriesBoard from './components/repositories-board';
import MyRepositories from './components/my-repositories';
import AuthModal from "./components/auth-modal";
import About from "./components/about";
import { Paths } from "./paths";
import useAuth from "./hooks/auth-hook";


function NotFound() {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}


const App: FC = () => {

    return (
        <Router>
            <AuthModal/>
            <CommonLayout>
                <Routes>
                    <Route element={ <RepositoriesBoard/> }/>
                    <Route path={ Paths.ABOUT } element={ <About/> }/>
                    <Route path={ Paths.MY_REPOSITORIES } element={ <MyRepositories/> }/>
                    <Route path={ Paths.REPOSITORIES_BOARD } element={ <RepositoriesBoard/> }/>
                    <Route path="*">
                        <NotFound />
                    </Route>
                </Routes>
            </CommonLayout>
        </Router>
    );
};


export default App;
