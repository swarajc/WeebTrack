import React from 'react';
import '../styles/SignIn.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';
import { useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function SignIn({ history, caughtToken, parentCallBack }) {

    const classes = useStyles();

    console.log(history);
    console.log(caughtToken);
    console.log(parentCallBack);

    const myInput = useRef(null);

    useEffect(() => {

        myInput.current.focus();

    }, []);

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: pass, bind: bindPass, reset: resetPass } = useInput('');
    const { value: inputType, show: showinputType } = useShow('password');

    const handleClick = (e) => {
        if (e.target.className.baseVal === "MuiSvgIcon-root Icon" || e.target.className.baseVal === "") {
            showinputType(inputType);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let url = "http://localhost:5000/users/validate";
        fetch(url, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                emailId: email,
                password: pass
            })
        })
            .then((result) => result.json())
            .then((info) => {

                if (info.user) {

                    resetEmail();
                    resetPass();
                    caughtToken = info.token;
                    parentCallBack(info.token);
                    history.push(`/u/${info.user.username}`);
                }
                else
                    if (info.error) {
                        console.log(info.error);
                    }

            });

    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-content">
                        <h1 className='header'>Sign in</h1>
                        <div className="form-item-divs">
                            <label htmlFor="emailid">
                                Email address
                            </label>
                            <div>
                                <input id="emailid" type="email" ref={myInput}{...bindEmail} required />
                            </div>
                        </div>
                        <div className="form-item-divs">
                            <label htmlFor="password">
                                Password
                                </label>
                            <div className="input-icon-wrap">
                                <span className="input-icon"><VisibilityIcon type="button" onClick={handleClick} className="Icon"></VisibilityIcon></span>
                                <input className="input-with-icon" id="password" type={inputType} {...bindPass} required />
                            </div>
                        </div>
                        <div className={classes.root}>
                            <Button href='/forgotpassword'>
                                Forgot Password?
                            </Button>
                        </div>

                        <div className={classes.root}>
                            <Button href='/signup'>
                                New to WeebTrack? Create an account.
                            </Button>
                        </div>
                        <div className={`${classes.root} mater-btn`}>
                            <Button variant="contained" color="primary" type = 'submit' >
                                Sign In
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}