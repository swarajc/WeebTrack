import React from 'react';
import '../styles/SignUp.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useState } from 'react';


export default function SignUp() {

    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Pass, setPass] = useState('');
    const [Cpass, setCpass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {


        let message = document.getElementById('message');
        switch (e.target.id) {
            case 'username': setUsername(e.target.value);

                break;

            case 'emailid': setEmail(e.target.value);

                break;

            case 'password': setPass(e.target.value);
                let element = document.getElementById('cpassword');
                element.disabled = false;
                if (e.target.value === '') {
                    element.value = '';
                    element.disabled = true;
                    message.textContent = '';
                }
                break;

            case 'cpassword': setCpass(e.target.value);
                if (e.target.value !== Pass)
                {
                    message.textContent = 'Passwords do not match';
                    message.style.cssText = "color: red";
                }
                    
                else
                {
                    message.textContent = 'Passwords match';
                    message.style.cssText = "color: green";
                }
                    
                
                break;

            default: console.log('invalid id');

                break;
        }
    }

    const handleClick = (e) => {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
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
                                    <input id="username" type="text" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-item-divs">
                                <label htmlFor="emailid">
                                    Email address
                                </label>
                                <div>
                                    <input id="emailid" type="email" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-item-divs">
                                <label htmlFor="password">
                                    Password
                                </label>
                                <div className="input-icon-wrap">
                                    <span className="input-icon" type="button" onClick={handleClick}><VisibilityIcon className="Icon"></VisibilityIcon></span>
                                    <input className="input-with-icon" id="password" type="password" onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="form-item-divs">
                                <label htmlFor="cpassword">
                                    Confirm password
                                </label>
                                <div>
                                    <input id="cpassword" type="password" disabled onChange={handleChange} required />
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