import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye} from '@fortawesome/free-solid-svg-icons';

import './LoginForm.css'

export const LoginForm = props => {
//  #states:
    const correctLogData = {email: 'a@b.c', password: 'test1234'} // no changes => useState no necessary;
    const [loginData, setLoginData] = useState({email: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);

//  #handlers:
    const submitHandler = e => {
        e.preventDefault();

        if (loginData.email === correctLogData.email && loginData.password === correctLogData.password) {
            props.setBoxState('success');
        } else {
            props.setBoxState('failed');
        }
    }

    const inputOnChangeHandler = e => {
        props.setBoxState('logging');
        setLoginData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const showPasswordHandler = () => {
        setShowPassword(prev => {
            return prev === false;
        })
    }

//  #return:
    return (
        <div className="LoginForm">
            <h1 className="LoginForm__title">Log in:</h1>
            <form onSubmit={submitHandler}>
                <label className="LoginForm__label">email
                    <input type="text"
                           className="LoginForm__input"
                           name="email"
                           value={loginData.email}
                           onChange={inputOnChangeHandler}/>
                </label>

                <label className="LoginForm__label">password
                    <input type={showPassword === false ? 'password' : 'text'}
                           className="LoginForm__input"
                           name="password"
                           value={loginData.password}
                           onChange={inputOnChangeHandler}/>
                    <span className="LoginForm__eye-icon"
                          onMouseDown={showPasswordHandler}
                          onMouseUp={showPasswordHandler}

                    ><FontAwesomeIcon icon={faEye}/></span>
                </label>
                <div className="LoginForm__button-wrapper">
                    <button className="LoginForm__button" type="submit">login</button>
                </div>
            </form>
        </div>
    );
}