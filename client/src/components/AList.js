import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';
import '../styles/AList.css'

export default function AList({ history, caughtToken, parentCallBack, match, location }) {

    const isMounted = useRef(true);

    console.log(caughtToken);

    console.log(match);

    const token = caughtToken;
    
    var [animes, setAnimes] = useState([]);
    
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
                            console.log(info);
                        }
                        else
                            if (info.error) {
                                console.log(info.error);
                            }

                    });
            }
        }
    },
        [history, token, match.params.id]
    )

    return(
        <div className="lcontainer">
            <h1>Anime List</h1>
        </div>
    )
}