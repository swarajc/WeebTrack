import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home'
import SignUp from './components/SignUp';   

function App(){
    return(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path = '/' component = {Home} />
                    <Route exact path = '/home' component = {Home} />   
                    <Route path = '/signup' component = {SignUp} />
                    {/* <Routh path = '/' component = {moreInfo}/> */}
                </Switch>
            </div>
        </BrowserRouter>
    )
}

export default App;