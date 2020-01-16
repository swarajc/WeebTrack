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


function App() {

    // localStorage.setItem('isAuthenticated', 'false');

    var Authenticated = localStorage.getItem('isAuthenticated');

    const [isAuthenticated, userHasAuthenticated] = useState(Authenticated);
    
    const [caughtToken, updateCaughtToken] = useState('');

    useEffect(() => {

        if (caughtToken !== '') {

            userHasAuthenticated(Authenticated);
        }

    }, [caughtToken, Authenticated]);

    function updateProp(received) {
        
        localStorage.setItem('isAuthenticated', 'true');
        Authenticated = localStorage.getItem('isAuthenticated');
        updateCaughtToken(received);

    }

    console.log(caughtToken);
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
                    <AuthenticatedRoute
                        path="/u/dashboard"
                        Component={Dashboard}
                        appProps={isAuthenticated}
                        caughtToken={caughtToken}
                    />
                    <UnauthenticatedRoute
                        exact path='/'
                        Component={Landing}
                        appProps={ isAuthenticated }
                    />
                    <UnauthenticatedRoute
                        path='/home'
                        Component={Home}
                        appProps={ isAuthenticated }
                    />
                    <UnauthenticatedRoute
                        path='/signin'
                        Component={SignIn}
                        appProps={ isAuthenticated }
                        caughtToken={caughtToken}
                        parentCallBack={updateProp}
                    />
                    <UnauthenticatedRoute
                        path='/signup'
                        Component={SignUp}
                        caughtToken={caughtToken}
                        appProps={ isAuthenticated }
                    />
                    <UnauthenticatedRoute
                        path="/forgotpassword"
                        Component={ForgotPass}
                        appProps={ isAuthenticated }
                    />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;