import React from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import DashBoard from '../components/Dashboard';

export default function AuthenticatedRoute( { appProps, caughtToken }) {

    console.log(appProps);
    console.log(caughtToken);
    return (
        <Route
            render={props =>
                appProps === true   
                    ? <DashBoard {...props} {...appProps} caughtToken = {caughtToken}/>
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}  
                    />}
        />
    );
}