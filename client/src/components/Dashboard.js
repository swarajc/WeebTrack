import React from 'react';
import '../styles/Dashboard.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';



export default function Dashboard({ history, caughtToken, parentCallBack, match, location }) {

    // ==========================================================

    console.log(history);
    console.log(match);
    console.log(location);

    

    const isMounted = useRef(true);

    console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    const myInput = useRef(null);

    const [Animes, setAnimes] = useState();

    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {

            // var id =  match.params.username;
            
            // console.log(id);
            
            // if(id !== UserName)
            // {
            //     history.push(`/u/${UserName}`);           
            // }



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
            history.push(`/u/${UserName}`);
        }
    }, 
    
    // [UserName, history, token, Animes, match.params.username]
        [UserName, history, token, Animes]
    )

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
        console.log(e.target.value);
        let url = "https://api.jikan.moe/v3/search/anime?q=" + e.target.value + "&page=1";
        if (e.target.value) {
            fetch(url)
                .then((response) => response.json())
                .then((info) => {

                    console.log(info);
                    setAnimes(info.results);

                });
        }
        else {
            setAnimes(null);
        }

    }

    // const handleClick = (e) => {
    //     // history.push(`/u/${UserName}/p`);
    // }


    return (
        <div className='dcontainer'>
            <div className='header1'>
                <div className='searchI'>
                    <div className="searchInput">
                        <input type="text" className='inputTag' placeholder="Search Anime" onChange={handleChange} ref={myInput} id="searchInputId" />
                    </div>
                    <div className='buttons'>
                        <Link to = {`/u/${UserName}/p`}><button>Welcome {UserName}</button></Link>
                        <button onClick={handleSubmit}>Sign out</button>
                    </div>
                </div>
                {
                    Animes ? (
                        <div className='dcontent'>
                            <div className='dwrapper'>
                                {
                                    Animes.map(animeItem => (
                                        <div className="child-wrapper" key={animeItem.mal_id}>
                                            <div className="spacer">
                                                <Link to= {'/u/' + UserName + '/a/' + animeItem.mal_id}>
                                                    <img className='thumbnail' title={animeItem.title} src={animeItem.image_url} alt={animeItem.title + " cover"} />
                                                </Link>         

                                                <Link to={'/u/' + UserName + '/a/' + animeItem.mal_id} className='thumbnail-title'>
                                                    {animeItem.title}
                                                </Link>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                        </div>
                    ) : (<p className='searchInput'>No Search Yet.</p>)
                }
            </div>
        </div>
    )
}