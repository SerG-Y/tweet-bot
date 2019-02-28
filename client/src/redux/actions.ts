const actions = {
    setUser: (user) => {
        return {
            type: 'SET_USER',
            user
        };
    },

    addKeyword: (keyword: string) => {
        return {
            type: 'ADD_KEYWORD',
            keyword
        };
    },

    setKeywords: (keywords: string[]) => {
        return {
            type: 'SET_KEYWORDS',
            keywords
        };
    },

    removeKeyword: (keyword: string) => {
        return {
            type: 'REMOVE_KEYWORD',
            keyword
        };
    },

    addTweet: (tweet) => {
        return {
            type: 'ADD_TWEET',
            tweet
        };
    }
};

export default actions;
