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


function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    const propData = useState({
        caughtToken: ''
    });

    useEffect(() => {

        whenLoad();

    });


    const whenLoad = () => {

        if (propData.caughtToken !== '') {
            userHasAuthenticated(true);
        }

    }

    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/home' component={Home} />
                    <Route path='/signin' render={(routeProps) => (<SignIn {...routeProps} {...propData} />)} />
                    <Route path='/signup' render={(routeProps) => (<SignUp {...routeProps} {...propData} />)} />
                    <Route path='/forgotpassword' component={ForgotPass} />
                    <AuthenticatedRoute
                        path="/u/dashboard"
                        render={(routeProps) => (<Dashboard {...routeProps} {...propData} />)}
                        appProps={{ isAuthenticated }}
                    />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;