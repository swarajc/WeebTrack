import React from 'react';
import '../styles/Dashboard.css';
import {Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';


export default function Dashboard(props){

    const isMounted = useRef(true);
    console.log(props);
    const token = props[0].caughtToken;

    useEffect(() => {

        if(isMounted.current === true){
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
                // .then((result) => result.json())
                .then((info) => {
    
                    if (info.user) {
                        console.log(info.user);                    
                    }
                    else
                        if (info.error) {
                            console.log(info.error);
                        }
    
                });
            
            }
        })

    return(
        <div>YO</div>
    )
}