import React from 'react';
import season from './Season.js'
import '../styles/Home.css'
import {useState, useEffect} from 'react'

const Home = () => {
    const [AnimeItems, setAnimeItems] = useState();
    // var page = 1;
    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
            .then(res => res.json())
            .then(response => {
                let items = response.top;
                setAnimeItems(items);
                console.log(response);
                console.log(items);    
            })
            .catch(error => console.log(error));
    }
        )

    return AnimeItems ? (
        <div className = 'anime-item'>
            <ul>
                {
                    AnimeItems.map(animeItem => (
                        <li>{animeItem.title}</li>
                    ))
                }
            </ul>
        </div>
    ): (<p>There are no items.</p>)
}

export default Home ;