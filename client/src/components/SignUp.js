import React from 'react';
import '../styles/SignUp.css';
// import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import { IconButton } from '@material-ui/core';    
  

// const useStyles = makeStyles({
//     EyeIconButton:{
//         padding: "10%",
//     },


// });

export default function Home(){

    // const classes = useStyles();
    const handleClick = (e) => {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
    
    return(
        <div className="container">
            <div className="homeHeader">
                <h2>Welcome to WeebTrack!</h2>
                <p>Now track your anime and manga with ease.</p>
            </div>
            <div>
                <form action = "" method = "POST">
                    
                    <div className = "card">
                        <div className = "card-content">
                            {/* <h2>Welcome to WeebTrack!</h2>
                            <p>Now track your anime and manga with ease.</p> */}
                            <h2>Create an account</h2>

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