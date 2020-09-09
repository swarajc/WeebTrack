import React from 'react';
import season from './Season.js';
import '../styles/Home.css';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { default as MatLink } from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Home = () => {

    const [AnimeItems, setAnimeItems] = useState();
    const isMounted = useRef(true);
    const classes = useStyles();

    useEffect(() => {

        if (isMounted.current === true) {
            fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
                .then(res => res.json())
                .then(response => {

                    let items = response.top;
                    setAnimeItems(items);

                })
                .catch(error => console.log(error));
        }

        return () => {

            isMounted.current = false;

        }

    }
    )



    return AnimeItems ? (
        <div className='content'>
            <div className='wrapper'>
                <div className="header">
                    <span>
                        <div className={classes.root}>
                            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                                <MatLink color="textPrimary" href="/">
                                    Home
                                </MatLink>
                                <MatLink color="textPrimary" href="/signup">
                                    Sign Up
                                </MatLink>
                                <MatLink color="textPrimary" href="/signin">
                                    Sign In
                                </MatLink>
                            </Breadcrumbs>
                        </div>
                    </span>
                    <h1>Trending Anime Of The {season}</h1>
                </div>
                {
                    AnimeItems.map(animeItem => (
                        <div className="child-wrapper" key={animeItem.mal_id}>
                            <div className="spacer">
                                <Link to="/signin">
                                    <img className='thumbnail' title={animeItem.title} src={animeItem.image_url} alt={animeItem.title + " cover"} />
                                </Link>

                                <Link to='/signin' className='thumbnail-title'>
                                    {animeItem.title}
                                </Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </div>
    ) : (<div className='loader'>
        <CircularProgress />
    </div>)
}

export default Home;