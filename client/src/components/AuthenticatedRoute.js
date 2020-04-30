import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
// import Dashboard from '../components/Dashboard';

export default function AuthenticatedRoute({ Component, appProps, caughtToken, parentCallBack, path }) {
    
    console.log(path);
    console.log(appProps);
    console.log(caughtToken);
    return (
        <Route
            path = {path}
            render={props =>
                appProps === 'true'
                    ? <Component {...props} {...appProps} caughtToken={caughtToken} parentCallBack={parentCallBack} />
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}