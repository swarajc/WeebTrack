import React from 'react';
import '../styles/Anime.css';
import { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function Anime({ history, caughtToken, match }) {

    const classes = useStyles();

    const isMounted = useRef(true);

    console.log(caughtToken);

    console.log(match);

    const token = caughtToken;

    const [anime, setAnime] = useState({});

    const [InsDel, setInsDel] = useState('Loading...');

    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {


            if (token !== '') {

                let url = "http://localhost:5000/user/u";
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
                            console.log(info)

                            let url = "https://api.jikan.moe/v3/anime/" + match.params.id;
                            fetch(url, { mode: 'cors' })
                                .then((response) => response.json())
                                .then((info) => {
                                    console.log(info);
                                    setAnime(info);
                                });

                            var found = undefined;
                            for (var i = 0; i < info.animes.length; i++) {
                                if (info.animes[i].anime.title === anime.title) {
                                    found = true;
                                    break;
                                }
                            }

                            if (found)
                                setInsDel('Remove From List')
                            else
                                setInsDel('Add To List')
                        }
                        else
                            if (info.error) {
                                console.log(info.error);
                            }
                    });
            }


        }

    },
        [anime.title, match.params.id, token]
    )


    const handleSubmit = (e) => {
        e.preventDefault();

        let url;

        if (InsDel === 'Add To List') {
            url = "http://localhost:5000/user/animes/addAnime";
        }
        else if (InsDel === 'Remove From List') {
            url = "http://localhost:5000/user/animes/delAnime";
        }

        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                animeObj: anime
            }),
            user: {},
            token: ''
        })
            .then((result) => result.json())
            .then((info) => {

                console.log(info.success);
                history.push('/u/reaper/l');
                // if (info.success === 'Anime added') {
                //     setInsDel('Remove From List');
                // }
                // else if (info.success === 'Anime removed') {
                //     setInsDel('Add to List');
                // }
            })
            .catch((err) => {
                console.log(err)
                window.location.reload();
            });
    }

    return (
        <div className='acontainer'>
            <div className={classes.root}>
                <Button size='small' href={`/u/reaper/a/${match.params.id}`}><h1>{anime.title}</h1></Button>
            </div>
            <hr />
            <div className='detailItems'>
                <div className='item'>
                    <h4>Episodes</h4>
                    <p>{anime.episodes ? anime.episodes : 'N/A'}</p>
                </div>
                <div className='item'>
                    <h4>Duration</h4>
                    <p>{anime.duration}</p>
                </div>
                <div className='item'>
                    <h4>Status</h4>
                    <p>{anime.status}</p>
                </div>
                <div className='item'>
                    <h4>Rating</h4>
                    <p>{anime.rating}</p>
                </div>
                <div className='item'>
                    <h4>Score</h4>
                    <p>{anime.score}</p>
                </div>
                <div className="item">
                    <h4>Rank</h4>
                    <p>{anime.rank}</p>
                </div>
                <div className='item'>
                    <h4>Popularity</h4>
                    <p>{anime.popularity}</p>
                </div>
            </div>
            <h2>Synopsis</h2>
            <p>{anime.synopsis}</p>
            <div className="add-btn">
                <form onSubmit={handleSubmit}>
                    <div className={classes.root}>
                        <Button type='submit' variant="contained" >{InsDel}</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}