import React from 'react';
import '../styles/Dashboard.css';
import { useEffect, useRef } from 'react';



export default function Dashboard({history, caughtToken}) {

    const isMounted = useRef(true);
    console.log(caughtToken);
    const token = caughtToken;

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

                        }
                        else
                            if (info.error) {

                                console.log(info.error);

                            }

                    });
            }


        }

        window.onpopstate = (e) => {
            history.push('/u/dashboard');
        }
    })

    return (
        <div>
        
        </div>
    )
}