
export default function (state= {
    userID: '-1',
    loggedIn: false,
    userInfo: {
        msg: "",
        gender: ""
    }
}, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                userID: action.userID,
                loggedIn: true
            };
        case 'LOGOUT':
            return {
                userID: '',
                loggedIn: false
            };
        default:
            return state;
    }
}

