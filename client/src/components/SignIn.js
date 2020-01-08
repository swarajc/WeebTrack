import React from 'react';
import '../styles/SignIn.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';
import { useRef, useEffect } from 'react';


export default function SignIn(props) {

    const myInput = useRef(null);
    console.log(props[0].caughtToken);
    
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

                    console.log(info.user);
                    props.history.push('/u/dashboard');                    
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

                        <Link to='/forgotpassword' className='forgot-pass-create form-item-divs'>
                            Forgot Password?
                        </Link>

                        <Link to='/signup' className='forgot-pass-create form-item-divs'>
                            New to WeebTrack? Create an account.
                        </Link>

                        <div className="buttonDiv form-item-divs">
                            <button>Sign In</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}