import React from 'react';
import '../styles/SignUp.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import { useState } from 'react';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';


export default function SignUp() {

    // let inputType = 'password';
    const { value: username, bind: bindUsername, reset: resetUsername } = useInput('');
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
    const { value: pass, bind: bindPass, reset: resetPass } = useInput('');
    const { value: cpass, bind: bindCpass, reset: resetCpass } = useInput('');

    const { value: inputType, show: showinputType } = useShow('password');

    const {}

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(pass);
        console.log(cpass);
        resetUsername();
        resetEmail();
        resetPass();
        resetCpass();
    }

    // const handleChange = (e) => {


    //     let message = document.getElementById('message');
    //     switch (e.target.id) {
    //         case 'username': setUsername(e.target.value);

    //             break;

    //         case 'emailid': setEmail(e.target.value);

    //             break;

    //         case 'password': setPass(e.target.value);
    //             let element = document.getElementById('cpassword');
    //             element.disabled = false;
    //             if (e.target.value === '') {
    //                 element.value = '';
    //                 element.disabled = true;
    //                 message.textContent = '';
    //             }
    //             break;

    //         case 'cpassword': setCpass(e.target.value);
    //             if (e.target.value !== Pass)
    //             {
    //                 message.textContent = 'Passwords do not match';
    //                 message.style.cssText = "color: red";
    //             }

    //             else
    //             {
    //                 message.textContent = 'Passwords match';
    //                 message.style.cssText = "color: green";
    //             }


    //             break;

    //         default: console.log('invalid id');

    //             break;
    //     }
    // }
    // MuiSvgIcon-root Icon

    const handleClick = (e) => {
        if (e.target.className.baseVal === "MuiSvgIcon-root Icon" || e.target.className.baseVal === "") {
            showinputType();
        }
    }

    return (
        <div className="scontainer">
            <div>
                <form action="" method="POST" onSubmit={handleSubmit}>

                    <div className="card">
                        <div className="card-content">
                            <h1 className='header'>Create an account</h1>

                            <div className="form-item-divs">
                                <label htmlFor="username">
                                    Username
                                </label>
                                <div>
                                    <input id="username" type="text" {...bindUsername} required />
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
                                    <input className="input-with-icon" id="password" type={inputType} {...bindPass} required />
                                </div>
                            </div>

                            <div className="form-item-divs">
                                <label htmlFor="cpassword">
                                    Confirm password
                                </label>
                                <div>
                                    <input id="cpassword" type="password"  {...bindCpass} required />
                                </div>
                            </div>

                            <span id='message'></span>

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