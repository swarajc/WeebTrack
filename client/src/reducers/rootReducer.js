
const initState = {
    animeList: []
}

const rootReducer = (state = initState, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        // case "FETCH_REQUEST":
        //     return state;
        // case "FETCH_SUCCESS":
        //     console.log(state);
        //     return { ...state, posts: action.payload };
        case 'INIT_ANIMES':
            return Object.assign({}, state, {
                animeList: action.Animes
            })

        case 'DEL_ANIME':
            console.log(action.mal_id)
            let newAnimes1 = state.animeList.filter(animeItem => {
                console.log(animeItem);
                return animeItem.anime.mal_id !== action.mal_id
            });

            return Object.assign({}, state, {
                animeList: newAnimes1
            })

        case 'ADD_ANIME':
            let newAnimes2 = [
                ...state.animeList,
                { '_id': action.anime.mal_id, 'anime': action.anime }
            ]

            return Object.assign({}, state, {
                animeList: newAnimes2
            })

        default:
            return state;
    }

}

export default rootReducer;