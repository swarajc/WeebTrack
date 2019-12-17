import React from 'react';
import '../styles/ForgotPass.css';

const ForgotPass = () => {

    return (
        <div className = 'fcontainer'>
            <form action="" method = "POST">
                <div className="card">
                    <div className="card-content">
                        {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track yo ur anime and manga with ease.</p> */}
                        <h1>Forgot Password</h1>
                        <div>
                            <label htmlFor="emailid">
                                Email address
                                </label>
                            <div>
                                <input id="emailid" type="email" required />
                            </div>
                        </div>
                        <div className="buttonDiv form-item-divs">
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )
}

export default ForgotPass;