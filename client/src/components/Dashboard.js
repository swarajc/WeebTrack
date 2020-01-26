import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';
// import ReactTimeout from 'react-timeout';


export default function Dashboard({history, caughtToken, parentCallBack}) {

    // var {history, caughtToken, parentCallBack} = props;

    const isMounted = useRef(true);

    console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    const myInput = useRef(null);

    const [searchText, setSearchText] = useState('');


    useEffect(() => {

        if (isMounted.current === true) {

            myInput.current.focus();

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
    }, [UserName, history, token])

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


    const handleChange = (e) => {

        e.preventDefault();
        setSearchText(e.target.value);    
    
    }

    const handleSearch = (e) => {

        e.preventDefault();
        setSearchText(e.target.value);
        console.log(searchText);
        let url = "https://api.jikan.moe/v3/search/anime?q=" + searchText + "&page=1";
        fetch(url, {
            method: 'get',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((info) => console.log(info));


    }

    return (
        <div className='dcontainer'>

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

                <form action="" onSubmit={handleSearch}>
                    <div className="searchInput" >
                        <input type="text" className='inputTag' placeholder="Search Anime" onChange = {handleChange} ref={myInput} name="q" id="searchInputId" />
                        <input type='submit' />
                    </div>
                </form>

            </div>



        </div>
    )
}