import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';

export default function UnauthenticatedRoute({ Component, appProps, caughtToken, parentCallBack }) {

    console.log(appProps);
    console.log(caughtToken);
    console.log(Component);

    return (
        <Route

            render={props =>
                appProps === false
                    ? <Component {...props} {...appProps} caughtToken={caughtToken} parentCallBack={parentCallBack} />
                    : <Redirect to={`/u/dashboard?redirect=${props.location.pathname}${props.location.search}`} />}
        />
    );
}

