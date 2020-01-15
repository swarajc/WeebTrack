import React from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';
// import Dashboard from '../components/Dashboard';

export default function AuthenticatedRoute( { Component, appProps, caughtToken }) {

    console.log(appProps);
    console.log(caughtToken);
    return (    
        <Route
            render={props =>
                appProps === true   
                    ? <Component {...props} {...appProps} caughtToken = {caughtToken}/>
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}  
                    />}
        />
    );
}