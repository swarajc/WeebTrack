import React from 'react';
import {useLocation} from 'react-router-dom';

const NoMatch = () => {

    let location = useLocation();
       
    return(
    
    <div>
      <h3>No match for {location.pathname}</h3>
    </div>
    )
    
    }

export default NoMatch;