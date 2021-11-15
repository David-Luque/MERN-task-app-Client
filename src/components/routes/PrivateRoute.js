import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/autentication/authContext';

const PrivateRoute = ({ component: Component, ...props })=>{
    
    const authContext = useContext(AuthContext);
    const { authenticated, loading, authenticateUser } = authContext;

    useEffect(()=>{
        authenticateUser();
        //eslint-disable-next-line
    }, []);
    
    return(
        <Route { ...props } render={props => !authenticated && !loading ? (
            <Redirect to="/" />
        ) : (
            <Component { ...props } />
        )} 
        />
    )
};

export default PrivateRoute;