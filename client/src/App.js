import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import forgotpass from './components/forgotpass';

function App(){
    return(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path = '/' component = {Home} />
                    <Route exact path = '/home' component = {Home} />   
                    <Route path = '/signin' component = {SignIn} />
                    <Route path = '/signup' component = {SignUp} />
                    <Route path = '/forgotpassword' component = {forgotpass} />
                    {/* <Routh path = '/' component = {moreInfo}/> */}
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;