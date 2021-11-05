import React, { FC } from 'react';
import CommonLayout from './layouts/common-layout';

import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import ReposBrowser from './components/repos-browser';
import MyProfile from './components/my-profile';


const App: FC = () => {

    return (
        <Router>
            <CommonLayout>
                <Routes>
                    <Route path='/repoboard' element={ <ReposBrowser/> }/>
                    <Route path='/me' element={ <MyProfile/> }/>
                </Routes>
            </CommonLayout>
        </Router>
    );
};


export default App;
