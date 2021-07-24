import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const { message, authenticated, sessionLogin } = authContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    //in case that email or password do not exist
    useEffect(()=>{
        if(authenticated) {
            props.history.push('/projects')
        }
        if(message) {
            showAlert(message.msg, message.category)
        }
        //eslint-disable-next-line
    }, [message, authenticated, props.history]);


    const [user, setUser] = useState({ 
        email: '',
        password: ''
    });
    const { email, password } = user


    const handleChange = e => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        //validate empty fields
        if(email.trim() === '' || password.trim() === '') {
            return showAlert('All fields are required', 'alert-error');
        };

        //pass to "action"
        sessionLogin({
            email,
            password
        })
    };



    return (
        <div className="form-user">
            <div className="container-form shadow-dark">
                <h1>Login</h1>

                { alert ? (
                    <div className={`alert ${alert.category}`}> {alert.msg} </div>
                ) : null }

                <form
                    onSubmit={handleSubmit}
                >
                    <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="field-form">
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Login"
                        />
                    </div>
                </form>

                <Link to={"/new-account"} className="link-account">
                    Create new account
                </Link>
            </div>
        </div>
        
    );
}
 
export default Login;