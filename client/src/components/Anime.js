import React from 'react';
import '../styles/Anime.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Anime({ history, caughtToken, parentCallBack, match, location }) {

    const isMounted = useRef(true);

    console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {

            // var id = match.params.username;

            // console.log(id);

            // if (id !== UserName) {
            //     history.push(`/u/${UserName}`);
            // }

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
                            setUserName(String(info.username));
                            console.log(UserName);
                        }
                        else
                            if (info.error) {

                                console.log(info.error);

                            }

                    });
            }

        }
    },

        // [UserName, history, token, match.params.username]
        [UserName, history, token]
    )

    return (
        <h1>Anime Page</h1>
    )
}