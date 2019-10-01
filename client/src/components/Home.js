import React from 'react';
import '../App.css';    

function Home(){
    return(
        <div className="container">
            <div className="homeHeader">
                <h1>Welcome to WeebTrack!</h1>
                <p>Now track your anime and manga with ease.</p>
            </div>
            <div>
                <form action = "" method = "POST">
                    
                    <div className = "card">
                        <div className = "card-content">

                            <div className = "form-item-divs">
                                <label htmlFor = "username">
                                    Username
                                </label>
                                <div>
                                    <input id = "username" type= "text"/>    
                                </div>            
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "emailid">
                                    Email address
                                </label>
                                <div>
                                    <input id = "emailid" type= "email"/>
                                </div>
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "password">
                                    Password
                                </label>
                                <div>
                                    <input id = "password" type= "password"/>
                                </div>
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "cpassword">
                                    Confirm password
                                </label>
                                <div>
                                    <input id = "cpassword" type= "password"/>
                                </div>
                            </div>
                            <div className = "buttonDiv form-item-divs">
                                    <button>Sign Up</button>
                            </div>
                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
               
    );
}

export default Home;