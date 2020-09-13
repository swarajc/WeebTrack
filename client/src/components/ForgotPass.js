import React from 'react';
import '../styles/ForgotPass.css';
import { useInput } from '../hooks/input-hook';
import { useRef, useEffect } from 'react';
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

const ForgotPass = () => {

    const classes = useStyles();

    const myInput = useRef(null);

    useEffect(() => {

        myInput.current.focus();

    }, []);

    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(email);
        resetEmail();
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
            <div className='fcontainer'>
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-content">
                            {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track yo ur anime and manga with ease.</p> */}
                            <h1 className='header'>Forgot Password</h1>
                            <div>
                                <label htmlFor="emailid">
                                    Email address
                                </label>
                                <div>
                                    <input id="emailid" type="email" ref={myInput} {...bindEmail} required />
                                </div>
                            </div>
                            <div className={classes.root}>
                                <Button variant="contained" color="primary">
                                    Submit
                            </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>


    )
}

export default ForgotPass;