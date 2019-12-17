import React from 'react';

const forgotpass = () => {

    return (
        <div className = 'container'>
            <form action="" method = "POST">
                <div className="card">
                    <div className="card-content">
                        {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track yo ur anime and manga with ease.</p> */}
                        <h1>Forgot Password</h1>
                        <div className="form-item-divs">
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

export default forgotpass;