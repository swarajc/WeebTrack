import React from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                appProps.isAuthenticated
                    ? <C {...props} {...appProps} />
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}