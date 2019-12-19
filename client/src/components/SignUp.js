import React from 'react';
import '../styles/SignUp.css';
import VisibilityIcon from '@material-ui/icons/Visibility';

export default function SignUp(){

    const handleClick = (e) => {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
    
    return(
        <div className="scontainer">
            <div>
                <form action = "" method = "POST">
                    
                    <div className = "card">
                        <div className = "card-content">
                            <h1 className = 'header'>Create an account</h1>

                            <div className = "form-item-divs">
                                <label htmlFor = "username">
                                    Username
                                </label>
                                <div>
                                    <input id = "username" type= "text" required/>    
                                </div>            
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "emailid">
                                    Email address
                                </label>
                                <div>
                                    <input id = "emailid" type= "email" required/>
                                </div>
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "password">
                                    Password
                                </label>
                                <div className = "input-icon-wrap">   
                                    <span className = "input-icon" type="button" onClick = {handleClick}><VisibilityIcon className= "Icon"></VisibilityIcon></span>
                                    {/* <span className = "input-icon"><IconButton className = {classes.EyeIconButton} onClick = {handleClick}><VisibilityIcon className= "Icon"/></IconButton></span> */}
                                    <input className="input-with-icon" id = "password" type= "password" required/>
                                </div>
                            </div>
                            
                            <div className = "form-item-divs">
                                <label htmlFor = "cpassword">
                                    Confirm password
                                </label>
                                <div>
                                    <input id = "cpassword" type= "password" required/>
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