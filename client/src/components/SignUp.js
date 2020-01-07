import React from 'react';
import '../styles/SignUp.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';
import { useRef, useEffect } from 'react';

export default function SignUp(props) {

    console.log(props[0]);
    const myInput = useRef(null);

    const message = '';

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

        let url = "http://localhost:5000/users/add";
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
                    props[0].caughtToken = info.token;
                    console.log(props[0].caughtToken);
                    redirect = '/signin'
                    console.log(redirect);
                    props.history.push(redirect);
                    
                }
                else if (info.code === 11000 && info.name === 'MongoError') {
                    console.log('Success?');
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
                                    <input className="input-with-icon" pattern = ".{8,}" title = "8 characters minimum" id="password" type={inputType} {...bindPass} required />
                                </div>
                            </div>

                            <div>
                                <span>
                                    {message}
                                </span>
                            </div>

                            <div className="buttonDiv form-item-divs">
                                <button>Sign Up</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}