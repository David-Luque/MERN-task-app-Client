import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';
import {
    SUCCESS_REGIST,
    FAILURE_REGIST,
    GET_USER,
    SUCCESS_LOGIN,
    FAILURE_LOGIN,
    CLOSE_SESSION
} from '../../types'; 


const AuthState = ({ children }) => {
    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState) 


    //create user
    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            dispatch({
                type: SUCCESS_REGIST,
                payload: response.data
            });
            //get user
            authenticateUser();
        } catch (error) {
            console.log(error.response);
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: FAILURE_REGIST,
                payload: alert
            });
        }
    };

    //return authenticated user
    const authenticateUser = async ()=>{
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            console.log(response);
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch (error) {
            dispatch({
                type: FAILURE_LOGIN
            });
        }
    };

    //when user login
    const sessionLogin = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: SUCCESS_LOGIN,
                payload: response.data
            });
            //get user
            authenticateUser();
        } catch (error) {
            console.log(error.response);
            let alert;
            if(error.response.data.msg) {
                alert = {
                    msg: error.response.data.msg,
                    category: 'alert-error'
                }
            } else {
                alert = {
                    msg: error.response.data.errors[0].msg,
                    category: 'alert-error'
                }
            }
            dispatch({
                type: FAILURE_LOGIN,
                payload: alert
            });
        }
    };

    //close user session
    const closeSession = ()=>{
        dispatch({
            type: CLOSE_SESSION
        });
    };


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                sessionLogin,
                authenticateUser,
                closeSession 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};


export default AuthState;