import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPass from './components/ForgotPass';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import { useState, useEffect } from 'react';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import NoMatch from './components/NoMatch';
import Profile from './components/Profile';
import Anime from './components/Anime';
import AList from './components/AList';
import initialiseAnimeList from '../src/actions/initialiseAnimeList';
import addAnime from '../src/actions/addAnime';
import deleteAnime from '../src/actions/deleteAnime';
import { connect } from 'react-redux';

function App(props) {

    console.log(props);

    const [isAuthenticated, userHasAuthenticated] = useState(props.isAuthenticated);

    const [caughtToken, updateCaughtToken] = useState(props.isToken);


    useEffect(() => {

        userHasAuthenticated(props.isAuthenticated)
        updateCaughtToken(props.isToken)

    }, [props.isAuthenticated, props.isToken]);

    console.log(caughtToken);
    console.log(isAuthenticated)

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>

                    <UnauthenticatedRoute
                        exact path='/'
                        Component={Landing}
                        appProps={isAuthenticated}
                    />

                    <AuthenticatedRoute
                        exact path="/u/:username/"
                        Component={Dashboard}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                        initialiseAnimeList={initialiseAnimeList}
                    />

                    <AuthenticatedRoute
                        path="/u/:username/p"
                        Component={Profile}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                    />

                    <AuthenticatedRoute
                        path="/u/:username/a/:id"
                        Component={Anime}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                        addAnime={addAnime}
                        deleteAnime={deleteAnime}
                    />

                    <AuthenticatedRoute
                        path="/u/:username/l"
                        Component={AList}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                        deleteAnime={deleteAnime}
                    />

                    <UnauthenticatedRoute
                        path='/signin'
                        Component={SignIn}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                    />


                    <UnauthenticatedRoute
                        path='/home'
                        Component={Home}
                        appProps={isAuthenticated}
                    />

                    <UnauthenticatedRoute
                        path='/signup'
                        Component={SignUp}
                        caughtToken={caughtToken}
                        appProps={isAuthenticated}
                    />

                    <UnauthenticatedRoute
                        path="/forgotpassword"
                        Component={ForgotPass}
                        appProps={isAuthenticated}
                    />

                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}

const mapStateToProps = ({ isAuthenticated, isToken }) => {
    console.log(isAuthenticated, isToken);
    return {
        isAuthenticated: isAuthenticated,
        isToken: isToken
    }
}

export default connect(mapStateToProps, null)(App)

// export default App;