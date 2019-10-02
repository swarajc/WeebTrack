import React, {Component} from 'react';
import '../App.css';
import VisibilityIcon from '@material-ui/icons/Visibility';  
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';  


class Home extends Component{

    handleClick = (e) => {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
      
    render(){
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
                                        <span className = "input-icon" type="button" onClick = {this.handleClick}><VisibilityIcon className= "Icon"></VisibilityIcon></span>
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
    
}

export default Home;