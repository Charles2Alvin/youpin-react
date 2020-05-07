import {connect} from "react-redux";

function mapStateToProps(state) {
    return {
        userID: state.userID,
        userInfo: state.userInfo,
        loggedIn: state.loggedIn
    }
}
function mapDispatchToProps(dispatch) {
    return {
        loginAction: (userID) => {
            dispatch({type: 'LOGIN', userID})
        }
    }
}
const glue = connect(mapStateToProps, mapDispatchToProps);


export default glue;