import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';
import '../styles/AList.css'

export default function AList({ history, caughtToken }) {

    const isMounted = useRef(true);

    const token = caughtToken;

    const [animes, setAnimes] = useState([]);

    useEffect(() => {

        if (isMounted.current === true) {

            if (token !== '') {

                // let url = "http://localhost:5000/users/u";
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
                            setAnimes(info.animes)
                        }
                        else
                            if (info.error) {
                                console.log(info.error);
                            }

                    });
            }
        }

        console.log(animes);

        return () => {
            isMounted.current = false;
        }
    },
        [history, token, animes]
    )

    return animes ? (
        <div className='lcontainer'>
            <h1>Anime List</h1>
            {
                animes.map(anime => (
                    <div key={anime.anime}>
                        <p>{anime.anime}</p>
                    </div>
                ))
            }
        </div>
    ) : (<p>Loading...</p>)
}