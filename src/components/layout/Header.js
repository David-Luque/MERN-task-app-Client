import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/autentication/authContext';
import { useHistory } from 'react-router-dom';


const Header = () => {
    //extract authentication info
    const authContext = useContext(AuthContext);
    const { user, authenticateUser, closeSession } = authContext;

    const history = useHistory();
    
    useEffect(()=>{
        authenticateUser();
        //eslint-disable-next-line
    }, []);


    return (
        <header className="app-header">
            {user ? (<p className="user-name"> Hello <span>{user.name}</span> </p>) : null}
            <nav className="nav-main">
                <button
                    data-cy="btn-logout"
                    className="btn btn-blank close-session"
                    onClick={() => {
                        closeSession();
                        history.push('/');
                    }}
                >
                    Log out
                </button>
            </nav>
        </header>
    );
}
 
export default Header;