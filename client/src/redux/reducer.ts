const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.user};

        case 'ADD_KEYWORD':
            return {...state, keywords: [action.keyword, ...state.keywords]};

        case 'SET_KEYWORDS':
            return {...state, keywords: [...action.keywords]};

        case 'REMOVE_KEYWORD':
                const index = state.keywords.indexOf(action.keyword);
                const newKeywords = [...state.keywords];

                newKeywords.splice(index, 1);

                return {...state, keywords: newKeywords};

        case 'ADD_TWEET':
            // let newItems = [{ name: action.tweet.name, text: action.tweet.text }, ...state.tweets];

            // newItems = newItems.length > 15 ? newItems.slice(0, 15) : newItems;

            return {...state, tweets: action.tweet};

        default:
            return state;
    }
};

export default reducer;
