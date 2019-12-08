import React from 'react';
import season from './Season.js'
import '../styles/Home.css'
import { useState, useEffect } from 'react'
// import {Row, Col} from 'react-simple-flex-grid';

const Home = () => {
    const [AnimeItems, setAnimeItems] = useState();
    // var page = 1;
    useEffect(() => {
        fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
            .then(res => res.json())
            .then(response => {
                let items = response.top;
                setAnimeItems(items);
                // console.log(response);
                // console.log(items);    
            })
            .catch(error => console.log(error));
    }
    )

    return AnimeItems ? (
        <div className='content'>
            <h1>Trending Anime Of The {season}</h1>
            <div className='wrapper'>
                {
                    AnimeItems.map(animeItem => (
                        <div className="spacer" key={animeItem.mal_id}>
                            {/* <a href={"https://myanimelist.net/anime/" + animeItem.mal_id + "/" + animeItem.title}> */}
                            <a href="/signup">
                                <img className='thumbnail' title={animeItem.title} src={animeItem.image_url} alt={animeItem.title + " cover"} />
                            </a>
                        </div>

                    ))
                }
            </div>
        </div>
    ) : (<p>Loading...</p>)
}

export default Home;