import React from 'react';
import '../styles/Anime.css';
import { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';


export default function Anime({ history, caughtToken, parentCallBack, match, location }) {

    const isMounted = useRef(true);

    console.log(caughtToken);

    console.log(match);

    const token = caughtToken;

    const [anime, setAnime] = useState({});

    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {


            if (token !== '') {

                let url = "http://localhost:5000/users/u";
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

                            console.log(info);
                            // setUserName(String(info.username));
                            // console.log(UserName);
                        }
                        else
                            if (info.error) {

                                console.log(info.error);

                            }

                    });
            }

            // if(!AnimeId){
            //     setAnimeId(match.params.id);
            // }

            let url = "https://api.jikan.moe/v3/anime/" + match.params.id;
            fetch(url, { mode: 'cors' })
                .then((response) => response.json())
                .then((info) => {
                    console.log(info);
                    setAnime(info);
                });

        }
    },

        [history, token, match.params.id]
    )

    return (
        <div className='acontainer'>
            <h1>{anime.title}</h1>
        </div>

    )
}