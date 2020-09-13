import React from 'react';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router';
// import Dashboard from '../components/Dashboard';

export default function AuthenticatedRoute({ Component, appProps, caughtToken, path, initialiseAnimeList, deleteAnime, addAnime, setIsAuthenticated, setIsToken }) {

    return (
        <Route
            path={path}
            render={props =>
                appProps === 'true'
                    ? <Component {...props} {...appProps} caughtToken={caughtToken} initialiseAnimeList={initialiseAnimeList} deleteAnime={deleteAnime} addAnime={addAnime} setIsAuthenticated={setIsAuthenticated} setIsToken={setIsToken} />
                    : <Redirect
                        to={`/signin?redirect=${props.location.pathname}${props.location.search}`}
                    />}
        />
    );
}