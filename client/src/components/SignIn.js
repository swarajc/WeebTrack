import React from 'react';
import '../styles/SignIn.css';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import { useInput } from '../hooks/input-hook';
import { useShow } from '../hooks/show-hook';



export default function SignIn(props) {

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

        let url = "http://localhost:5000/signup/add";
        fetch(url, {
            method: 'get',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                emailId: email,
                password: pass
            })
        })
            .then((result) => result.json());

        resetEmail();
        resetPass();

    }

    return (
        <div className='container'>
            <form action="" method="GET" onSubmit={handleSubmit}>
                <div className="card">
                    <div className="card-content">
                        {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track yo ur anime and manga with ease.</p> */}
                        <h1 className='header'>Sign in</h1>
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