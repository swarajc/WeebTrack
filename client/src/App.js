import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPass from './components/ForgotPass';
import Landing from './components/Landing';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/home' component={Home} />
                    <Route path='/signin' component={SignIn} />
                    <Route path='/signup' component={SignUp} />
                    <Route path='/forgotpassword' component={ForgotPass} />
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;