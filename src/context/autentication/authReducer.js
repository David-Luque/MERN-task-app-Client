import {
    SUCCESS_REGIST,
    FAILURE_REGIST,
    GET_USER,
    SUCCESS_LOGIN,
    FAILURE_LOGIN,
    CLOSE_SESSION
} from '../../types';

const AuthReducer = (state, action)=>{
    switch(action.type) {
        case CLOSE_SESSION:
        case FAILURE_REGIST:
        case FAILURE_LOGIN:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
        case SUCCESS_REGIST:
        case SUCCESS_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }

        default:
            return state;
    }
};

export default AuthReducer;