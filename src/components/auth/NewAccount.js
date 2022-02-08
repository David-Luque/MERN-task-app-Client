import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/autentication/authContext';
import Alert from '../layout/Alert';

const NewAccount = (props) => {

    //extract context values
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    const authContext = useContext(AuthContext);
    const { message, authenticated, registerUser } = authContext;

    // authenticated user, registered or duplicate registration
    useEffect(()=>{
        if(authenticated) {
            props.history.push('/projects')
        }
        if(message) {
            showAlert(message.msg, message.category )
        }
        //eslint-disable-next-line
    }, [message, authenticated, props.history]);


    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        second_password: ''
    });
    const { name, email, password, second_password } = user

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
        if(
            name.trim() === '' ||
            email.trim() === '' ||
            password.trim() === '' ||
            second_password.trim() === ''
        ) {
            return showAlert('All fields are required', 'alert-error');
        }

        //password minimum 6 characters
        if(password.length < 6) {
            return showAlert('Password must be longer than 6 characters', 'alert-error');
        }

        //both passwords identical
        if(password !== second_password) {
            return showAlert('Both passwords must be identical', 'alert-error');
        }

        //pass to "action"
        registerUser({
            name,
            email,
            password
        })
    };



    return (
        <div className="form-user">
            
            <Alert alert={alert} />
            
            <div className="container-form shadow-dark">
                <h1
                    data-cy="signup-title"
                > Create account </h1>

                <form
                    data-cy="signup-form"
                    onSubmit={handleSubmit}
                >

                    <div className="field-form">
                        <label htmlFor="name">Username</label>
                        <input
                            data-cy="name-input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your username"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input
                            data-cy="email-input"
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
                            data-cy="password-input"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-form">
                        <label htmlFor="second_password">Confirm password</label>
                        <input
                            data-cy="second-password-input"
                            type="password"
                            id="second_password"
                            name="second_password"
                            placeholder="Repeat your password"
                            value={second_password}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field-form">
                        <input
                            data-cy="signup-submit"
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Create account"
                        />
                    </div>
                </form>

                <Link 
                    data-cy="login-link"
                    to={"/"} 
                    className="link-account"
                > Do you already have an account? </Link>
            </div>
        </div>
        
    );
}
 
export default NewAccount;