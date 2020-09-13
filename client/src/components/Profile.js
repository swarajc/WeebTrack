import React from 'react';
import { useRef, useEffect, useState } from 'react';
import '../styles/Profile.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

export default function Profile({ history, caughtToken, match, location }) {

    // console.log(history);
    // console.log(match);
    // console.log(location);

    const isMounted = useRef(true);

    const token = caughtToken;

    const [UserName, setUserName] = useState('');

    var updateUserName = ''

    var [emailId, setEmailId] = useState('');

    var pass = '';

    const [loaded, setLoaded] = useState(false);

    const [message, setMessage] = useState('');

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

                // let url = "http://localhost:5000/user/u";
                let url = "/user/u";
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

                            // console.log(info);
                            setUserName(String(info.username));
                            setEmailId(String(info.emailId));
                            setLoaded(true)
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

    const handleSubmit = (e) => {

        e.preventDefault();

        // let url = "http://localhost:5000/user/update";
        let url = "/user/update";

        let updates = {
            username: updateUserName,
            password: pass
        }

        // console.log(updates);

        let updateObj = {};
        updateObj.updates = updates;
        updateObj.checker = emailId;

        // console.log(updateObj);
        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ updateObj: updateObj })
        })
            .then((result) => result.json())
            .then((info) => {
                // console.log(info);
                setMessage(info.message);
                history.push(`/u/${UserName}/p`)
                // if (info.newUser) {
                //     caughtToken = info.token;
                //     console.log(caughtToken);
                // }
                // else if (info.code === 11000 && info.name === 'MongoError') {
                //     console.log(info);
                //     if (info.keyValue.username)
                //         setMessage('Username already in use');
                // }
            });
    }

    const handleChange = (e) => {

        if (e.target['id'] === 'username') {
            updateUserName = e.target.value
            // console.log(updateUserName);
        }

        // if (e.target['id'] === 'emailId') {
        //     emailId = e.target.value
        //     console.log(emailId);
        // }

        if (e.target['id'] === 'password') {
            pass = e.target.value
            // console.log(pass);
        }
    }

    return loaded ? (
        <div className='pcontainer'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-content">
                            <h1 className='headerP'>Update Info</h1>
                            <div className='form-item-divsP'>
                                <label htmlFor="username">
                                    Username
                                </label>
                                <div className='forInfo-edit'>
                                    <input id="username" type="text" placeholder={UserName} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-item-divsP">
                                <label htmlFor="emailid">
                                    Email address
                                </label>
                                <div className='forInfo'>
                                    <input id="emailid" type="email" placeholder={emailId} disabled />
                                </div>
                            </div>

                            <div className="form-item-divsP">
                                <label htmlFor="password">
                                    New Password
                                </label>
                                <div className="forInfo">
                                    <input type='password' pattern=".{7,}" title="7 characters minimum" id="password" placeholder='Minimum 7 characters' onChange={handleChange} />
                                </div>
                            </div>

                            <div className='form-item-divsP'>
                                <Button variant="contained" color="primary" type='submit'>
                                    Update
                                </Button>
                                <span className = 'result'>
                                    {message}
                                </span>
                            </div>


                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : (<div className='loader'>
        <CircularProgress />
    </div>)
}