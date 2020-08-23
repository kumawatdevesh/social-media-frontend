const initialState = {
    userId: null,
    userToken: null,
    timeUp: null
};

const reducer = (state = initialState, action) => {
    if(action.type === 'login') {
        
        const time = action.timeUp || new Date(new Date().getTime() + 1000 * 60 * 60);
        const data = {
            userId: action.userId,
            userToken: action.userToken,
            timeUp: time.toISOString()
        }
        localStorage.setItem('userData', JSON.stringify(data));
        return {
            ...state,
            userId: action.userId,
            userToken: action.userToken,
            timeUp: time
        }
    }
    if(action.type === 'logout') {
        localStorage.removeItem('userData');
        localStorage.removeItem('like');
        return {
            userId: null,
            userToken: null,
            timeUp: null
        }
    }
    return state;
};

export default reducer;