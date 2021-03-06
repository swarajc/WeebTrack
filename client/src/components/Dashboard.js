import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import initialiseAnimeList from '../actions/initialiseAnimeList';
import setIsAuthenticated from '../actions/setIsAuthenticated'
import setIsToken from '../actions/setIsToken';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({  
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


const Dashboard = ({ history, caughtToken, match, location, initialiseAnimeList, animeList, setIsAuthenticated, setIsToken }) => {

    // ==========================================================

    // console.log(animeList);  
    const classes = useStyles();

    // console.log(history);
    // console.log(match);
    // console.log(location);

    const isMounted = useRef(true);

    // console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    const myInput = useRef(null);

    const [Animes, setAnimes] = useState();

    const [loaded, setLoaded] = useState(false);
    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {

            if (token !== '') {

                // let url = "http://localhost:5000/user/u";
                let url = "/user/u";
                fetch(url, {

                    method: 'get',

                    headers: {

                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`

                    },

                    user: {},
                    token: ''

                })
                    .then((result) => result.json())
                    .then((info) => {

                        if (info) {

                            // console.log(info);
                            setUserName(String(info.username));
                            // console.log(UserName);
                            initialiseAnimeList(info.animes);
                            setLoaded(true)
                            myInput.current.focus();
                        }
                        else
                            if (info.error) {
                                console.log(info.error);
                            }

                    });
            }

            // console.log(Animes);

        }

        window.onpopstate = (e) => {
            history.push(`/u/${UserName}`);
        }

        return () => {

            isMounted.current = false;

        }
    },
        [UserName, history, token, Animes, initialiseAnimeList]
    )

    const handleSubmit = (e) => {

        e.preventDefault();
        // let url = "http://localhost:5000/user/u/logout";
        let url = "/user/u/logout";
        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            user: {},
            token: ''

        })
            .then((result) => result.json())
            .then((info) => {

                // console.log(info);

                if (info.success) {

                    // console.log(info);
                    setIsToken('')
                    setIsAuthenticated('false')
                    history.push('/');
                }
                else
                    if (info.error) {

                        console.log('Error' + info.error);

                    }

            })
            .catch((error) => console.log(error));
    }

    const handleChange = (e) => {

        e.preventDefault();
        console.log(e.target.value);
        let url = "https://api.jikan.moe/v3/search/anime?q=" + e.target.value + "&page=1";
        if (e.target.value) {
            fetch(url)
                .then((response) => response.json())
                .then((info) => {
                    // console.log(info);
                    setAnimes(info.results);
                })
                .catch(err => {
                    console.log(err);
                    // window.location.reload();
                });
        }
        else {
            setAnimes(null);
        }

    }

    // const handleClick = (e) => {
    //     // history.push(`/u/${UserName}/p`);
    // }


    return loaded?(
        <div className='dcontainer'>
            <div className='header1'>
                <div className='searchI'>
                    <div className="searchInput">
                        <input type="text" className='inputTag' placeholder="Search Anime" onChange={handleChange} ref={myInput} id="searchInputId" />
                    </div>
                    <div className='buttons'>
                        <div className={classes.root}>
                            <Link to={`/u/${UserName}/p`} className='btns'>
                                <Button variant="contained">Welcome {UserName}</Button>
                            </Link>
                            <Button onClick={handleSubmit} variant="contained">Sign out</Button>
                        </div>
                    </div>
                </div>
                {
                    Animes ? (
                        <div className='dcontent'>
                            <div className='dwrapper'>
                                {
                                    Animes.map(animeItem => (
                                        <div className="child-wrapper" key={animeItem.mal_id}>
                                            <div className="spacer">
                                                <Link to={'/u/' + UserName + '/a/' + animeItem.mal_id}>
                                                    <img className='thumbnail' title={animeItem.title} src={animeItem.image_url} alt={animeItem.title + " cover"} />
                                                </Link>

                                                <Link to={'/u/' + UserName + '/a/' + animeItem.mal_id} className='thumbnail-title'>
                                                    {animeItem.title}
                                                </Link>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    ) : (<p className='searchInput'>No Search Yet. (Min. 3 letters)</p>)
                }
            </div>
        </div>
    ): (<div className='loader'>
    <CircularProgress />
</div>)
}

const mapStateToProps = (animeList) => {
    // console.log(animeList);
    return {
        animeList: animeList
    }
}

const mapDispatchToProps = (dispatch, props) => {
    // console.log(props);
    // console.log(dispatch);
    return {
        initialiseAnimeList: (Animes) => dispatch(initialiseAnimeList(Animes)),
        setIsAuthenticated: (value) => dispatch(setIsAuthenticated(value)),
        setIsToken: (value) => dispatch(setIsToken(value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);