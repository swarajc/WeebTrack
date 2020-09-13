import React from 'react';
import '../styles/SignIn.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';
import { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import setIsAuthenticated from '../actions/setIsAuthenticated'
import setIsToken from '../actions/setIsToken';
import { connect } from 'react-redux';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom'
import { default as MatLink } from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const SignIn = ({ history, caughtToken, setIsAuthenticated, setIsToken }) => {

    const classes = useStyles();

    // console.log(history);

    const myInput = useRef(null);

    const [message, setMessage] = useState(' ');

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

        // let url = "http://localhost:5000/validate";
        let url = "/validate";
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
                    setIsAuthenticated('true')
                    setIsToken(info.token)
                    history.push(`/u/${info.user.username}`);
                }
                else
                    if (info.error) {
                        setMessage(info.error);
                    }

            });

    }

    return (
        <div>
            <span className = 'breadCrumb'>
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
                            <div>
                                <span className='message'>
                                    {message}
                                </span>
                            </div>
                            <Link to='/forgotpassword' className='btns'>
                                <Button>
                                    Forgot Password?
                                </Button>
                            </Link>

                            <Link to='/signup' className='btns'>
                                <Button>
                                    New to WeebTrack? Create an account.
                                    </Button>
                            </Link>

                            <div className={`${classes.root} mater-btn`}>
                                <Button variant="contained" color="primary" type='submit' >
                                    Sign In
                            </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    )
}

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch);
    return {
        setIsAuthenticated: (value) => dispatch(setIsAuthenticated(value)),
        setIsToken: (value) => dispatch(setIsToken(value))
    }
}

export default connect(null, mapDispatchToProps)(SignIn)    
