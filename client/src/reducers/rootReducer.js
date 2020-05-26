
const initState = {
    animeList: []
}

const rootReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        // case "FETCH_REQUEST":
        //     return state;
        // case "FETCH_SUCCESS":
        //     console.log(state);
        //     return { ...state, posts: action.payload };
        case 'INIT_ANIMES':
            console.log(action.Animes);
            return {   
                animeList: action.Animes
            };   
        default:
            return state;
    }
    
}

export default rootReducer;