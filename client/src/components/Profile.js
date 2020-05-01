import React from 'react';
import {useRef, useEffect, useState} from 'react';
import '../styles/Profile.css';

export default function Profile({ history, caughtToken, parentCallBack, match, location }){

    console.log(history);
    console.log(match);
    console.log(location);

    

    const isMounted = useRef(true);

    console.log(caughtToken);

    const token = caughtToken;

    var [UserName, setUserName] = useState('User');

    // const myInput = useRef(null);


    // ==========================================================   

    useEffect(() => {

        if (isMounted.current === true) {

            // var id =  match.params.username;
            
            // console.log(id);
            
            // if(id !== UserName)
            // {
            //     history.push(`/u/${UserName}`);           
            // }

            // myInput.current.focus();

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
            history.push(`/u/${UserName}`);
        }
    }, 
    
    // [UserName, history, token, Animes, match.params.username]
        [UserName, history, token]
    )

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
        }
    
    return(
        <div className='pcontainer'>
            <h1>{Capitalize(UserName)}'s Profile</h1>
        </div>
    )
}