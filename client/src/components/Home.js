import React from 'react';
import season from './Season.js'
import '../styles/Home.css'
import {useState, useEffect} from 'react'

const Home = () => {
    var page = 1;
    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/top/anime/${page}/airing`)
            .then(res => res.json)
            .catch(error => console.log(error));

    }, [page]
        )
    return(
        <div>
            <h1>Trending Anime of the {season}</h1>         
            <div className = 'animeCovers'>
                 
            </div>
        </div> 
    )    
}

export default Home ;