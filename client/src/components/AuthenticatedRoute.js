import React from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router';
// import DashBoard from '../components/Dashboard';

export default function AuthenticatedRoute( {component, appProps, ...rest }) {
    
    return (
        <Route
            render={props =>
                appProps
                    ? <component{...props} {...appProps} {...rest}/>
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}  
                    />}
        />
    );
}