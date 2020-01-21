import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';



export default function Dashboard({ history, caughtToken, parentCallBack }) {

    const isMounted = useRef(true);
    console.log(caughtToken);
    const token = caughtToken;
    var [UserName, setUserName] = useState('User');
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

        window.onpopstate = (e) => {
            history.push('/u/dashboard');
        }
    }, [UserName])

    const handleSubmit = (e) => {

        e.preventDefault();
        let url = "http://localhost:5000/users/u/logout";
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

                console.log(info);

                if (info.success) {

                    console.log(info);
                    caughtToken = '';

                    parentCallBack(caughtToken);
                    history.push('/home');
                }
                else
                    if (info.error) {

                        console.log('Error' + info.error);

                    }

            })
            .catch((error) => console.log(error));

    }

    return (
        <div>
            <div className='d-buttons'>
               
                <form onSubmit={handleSubmit}>

                    <div className='logOut'>
                        <button className='b-logOut' type='submit'>Sign out</button>
                    </div>

                </form>
                <form action="">
                    <div className='profile'>
                        <button className='b-profile'>Welcome {UserName}</button>
                    </div>
                </form>
            </div>

        </div>
    )
}