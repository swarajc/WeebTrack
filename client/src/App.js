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


function App() {

    // localStorage.setItem('isAuthenticated', 'false');

    var Authenticated = localStorage.getItem('isAuthenticated');

    var holdToken = localStorage.getItem('isToken');

    const [isAuthenticated, userHasAuthenticated] = useState(Authenticated);

    const [caughtToken, updateCaughtToken] = useState(holdToken);



    useEffect(() => {
    
        if (caughtToken !== '') {

            userHasAuthenticated(Authenticated);
        }
        else {

            userHasAuthenticated(Authenticated);

        }

    }, [caughtToken, Authenticated]);

    function updateProp(received) {

        if (received === '') {
            localStorage.setItem('isAuthenticated', 'false');
            Authenticated = localStorage.getItem('isAuthenticated');
            localStorage.setItem('isToken', received);
            holdToken = localStorage.getItem('isToken');
        }
        else {
            localStorage.setItem('isAuthenticated', 'true');
            Authenticated = localStorage.getItem('isAuthenticated');
            localStorage.setItem('isToken', received);
            holdToken = localStorage.getItem('isToken');
        }

        updateCaughtToken(holdToken);

    }

    console.log(caughtToken);
    console.log(holdToken)
    console.log(Authenticated);

    

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    {/* <Route exact path='/' component={Landing} />
                    <Route exact path='/home' component={Home} />
                    <Route path='/signin' render={(routeProps) => (<SignIn {...routeProps} caughtToken={caughtToken} parentCallBack={updateProp} />)} />
                    <Route path='/signup' render={(routeProps) => (<SignUp {...routeProps} caughtToken={caughtToken} />)} />
                    <Route path='/forgotpassword' component={ForgotPass} /> */}

                    <UnauthenticatedRoute
                        exact path='/'
                        Component={Landing}
                        appProps={isAuthenticated}
                    />

                    <AuthenticatedRoute
                        path="/u/:username"
                        Component={Dashboard}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                        parentCallBack={updateProp}
                    />


                    <UnauthenticatedRoute
                        path='/signin'
                        Component={SignIn}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                        parentCallBack={updateProp}
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

                    <Route path = "*">
                        <NoMatch />    
                    </Route>  
                     
                    
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;