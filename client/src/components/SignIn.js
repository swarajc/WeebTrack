import React from 'react';
import '../styles/SignIn.css';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function SignIn() {

    const handleClick = (e) => {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }

    return (
        <div className = 'container'>
            <form action="" method="GET">
                <div className="card">
                    <div className="card-content">
                        {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track yo ur anime and manga with ease.</p> */}
                        <h1 className = 'header'>Sign in</h1>
                        <div className="form-item-divs">
                            <label htmlFor="emailid">
                                Email address
                                </label>
                            <div>
                                <input id="emailid" type="email" required />
                            </div>
                        </div>
                        <div className="form-item-divs">
                            <label htmlFor="password">
                                Password
                                </label>
                            <div className="input-icon-wrap">
                                <span className="input-icon" type="button" onClick={handleClick}><VisibilityIcon className="Icon"></VisibilityIcon></span>
                                <input className="input-with-icon" id="password" type="password" required />
                            </div>
                        </div>

                        <a href='/forgotpassword' className = 'forgot-pass-create form-item-divs'>
                            Forgot Password?
                        </a>

                        <a href='/signup' className = 'forgot-pass-create form-item-divs'>
                            New to WeebTrack? Create an account.    
                        </a>                              

                        <div className="buttonDiv form-item-divs">
                            <button>Sign In</button>
                        </div>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}