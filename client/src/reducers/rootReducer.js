
const fetchFromDB = () => {
    let url = "http://localhost:5000/user/u";
    fetch(url, {
        method: 'get',
        headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        user: {},
        token: ''
    })
        .then((result) => result.json())
        .then((info) => {
            if (info) {
                console.log(info);
                initState = {
                    ...initState,
                    animeList: [...animeList, info.animes]
                }
            }
            else
                if (info.error) {
                    console.log(info.error);
                }
        });
}

const initState = {
    animeList: []
}

fetchFromDB();
console.log(initState);

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ANIME': {
            return { ...state, animeList: [...animeList, action.anime] }
        }
            break;

        case 'REM_ANIME': {

            let newAnimeList = animeList.filter((anime) => {
                return anime.mal_id !== action.anime.mal_id;    
            });

            return {
                ...state,
                animeList: newAnimeList
            }
        }
            break;

        default:
            break;
    }
    return state;
}

export default rootReducer;