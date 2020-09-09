import React from 'react';
import '../styles/SignUp.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';
import { useRef, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { default as MatLink } from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));


export default function SignUp({ history, caughtToken, parentCallBack }) {

    const classes = useStyles();

    const myInput = useRef(null);

    const [message, setMessage] = useState(' ');

    useEffect(() => {

        myInput.current.focus();

    }, []);

    //INPUT HOOKS
    const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: pass, bind: bindPass, reset: resetPass } = useInput('');


    //SHOW HOOK FOR PWD
    const { value: inputType, show: showinputType } = useShow('password');


    //FUNCTION INVOKED AFTER SUBMIT
    const handleSubmit = (e) => {

        var redirect = '/signup'

        e.preventDefault();

        // let url = "http://localhost:5000/add";
        let url = "/add";
        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                emailId: email,
                password: pass
            })
        })
            .then((result) => result.json())
            .then((info) => {

                if (info.newUser) {

                    resetUsername();
                    resetEmail();
                    resetPass();
                    caughtToken = info.token;
                    console.log(caughtToken);
                    redirect = '/signin'
                    console.log(redirect);
                    history.push(redirect);

                }
                else if (info.code === 11000 && info.name === 'MongoError') {
                    console.log(info);
                    if (info.keyValue.username)
                        setMessage('Username already in use, maybe the email too');
                    else if (info.keyValue.emailId)
                        setMessage('Email address already in use');
                }
                else {

                    resetUsername();
                    resetEmail();
                    resetPass();

                }

            });
    }

    //INVOKED AT CLICK ACTION ON EYE ICON
    const handleClick = (e) => {
        if (e.target.className.baseVal === "MuiSvgIcon-root Icon" || e.target.className.baseVal === "") {
            showinputType(inputType);
        }
    }

    return (
        <div>
            <span className='breadCrumb'>
                <div className={classes.root}>
                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                        <MatLink color="textPrimary" href="/">
                            Home
                                </MatLink>
                        <MatLink color="textPrimary" href="/signup">
                            Sign Up
                                </MatLink>
                        <MatLink color="textPrimary" href="/signin">
                            Sign In
                                </MatLink>
                    </Breadcrumbs>
                </div>
            </span>
            <div className="scontainer">
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-content">
                                <h1 className='header'>Create an account</h1>

                                <div className="form-item-divs">
                                    <label htmlFor="username">
                                        Username
                                </label>
                                    <div>
                                        <input id="username" type="text" ref={myInput} {...bindUsername} required />
                                    </div>
                                </div>

                                <div className="form-item-divs">
                                    <label htmlFor="emailid">
                                        Email address
                                </label>
                                    <div>
                                        <input id="emailid" type="email" {...bindEmail} required />
                                    </div>
                                </div>

                                <div className="form-item-divs">
                                    <label htmlFor="password">
                                        Password
                                </label>
                                    <div className="input-icon-wrap">
                                        <span className="input-icon"><VisibilityIcon type="button" onClick={handleClick} className="Icon"></VisibilityIcon></span>
                                        <input className="input-with-icon" pattern=".{7,}" title="7 characters minimum" id="password" type={inputType} {...bindPass} required />
                                    </div>
                                </div>

                                <div>
                                    <span className='message'>
                                        {message}
                                    </span>
                                </div>

                                <div className={`${classes.root} mater-btn`}>
                                    <Button variant="contained" color="primary" type='submit'>
                                        Sign Up
                            </Button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}