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

        case 'SET_TWEETS':
            return {...state, tweets: action.tweets};

        default:
            return state;
    }
};

export default reducer;
