import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';


export default function Dashboard({ history, caughtToken, parentCallBack }) {


    const isMounted = useRef(true);

    console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    const myInput = useRef(null);

    // const [searchText, setSearchText] = useState('');

    const [Animes, setAnimes] = useState();

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

            console.log(Animes);
        }


        window.onpopstate = (e) => {
            history.push('/u/dashboard');
        }
    }, [UserName, history, token, Animes])

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
        // setSearchText(e.target.value);

        let url = "https://api.jikan.moe/v3/search/anime?q=" + e.target.value + "&page=1";
        fetch(url)
            .then((response) => response.json())
            .then((info) => {

                console.log(info);
                setAnimes(info.results);

            });

    }

    // const handleSearch = (e) => {

    //     e.preventDefault();

    //     // let url = "https://api.jikan.moe/v3/search/anime?q=" + searchText + "&page=1";
    //     // fetch(url)
    //     //     .then((response) => response.json())
    //     //     .then((info) => {

    //     //         console.log(info);
    //     //         setAnimes(info.results);

    //     //     });


    // }

    return (
        <div className='dcontainer'>

            <div className="searchInput">
                <input type="text" className='inputTag' placeholder="Search Anime" onChange={handleChange} ref={myInput} id="searchInputId" />
            </div>

            <div className='buttons'>
                <button>Welcome {UserName}</button>
                <button onClick={handleSubmit}>Sign out</button>
            </div>

        </div>
    )
}