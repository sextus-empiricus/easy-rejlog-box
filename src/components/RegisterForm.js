import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faCircleCheck} from '@fortawesome/free-solid-svg-icons';

import './RegisterForm.css'

export const RegisterForm = props => {
//  #states:
    const [registerData, setRegisterData] = useState({email: '', password: '', providePassword: ''});
    const [showPassword, setShowPassword] = useState(false);

//  #handlers:
    const submitHandler = e => {
        e.preventDefault();
        //  #validation:

        if (!registerData.email.includes('@')) {
            props.setBoxState('validation')
            return props.showRegisterStatusBox(true, 'Please provide a correct email address.');
        } else if (registerData.password.length < 8) {
            props.setBoxState('validation')
            return props.showRegisterStatusBox(true, 'Password must be at least 8 characters long.');
        } else if (!(registerData.password === registerData.providePassword)) {
            props.setBoxState('validation')
            return props.showRegisterStatusBox(true, 'The passwords do not match.');
        }
        //  #success:
        props.showRegisterStatusBox(true, 'Registered!');
        props.setBoxState('registered');
    }

    const inputOnChangeHandler = e => {
        props.showRegisterStatusBox(false, '');
        props.setBoxState('logging');
        setRegisterData(prev => ({...prev, [e.target.name]: e.target.value}))
    }

    const showPasswordHandler = () => {
        setShowPassword(prev => {
            return prev === false;
        })
    }

//  #return:
    return (
        <div className="RegisterForm">
            <h1 className="RegisterForm__title">Register</h1>
            <form onSubmit={submitHandler}>
                <label className="RegisterForm__label">email
                    <input type="text"
                           className="RegisterForm__input"
                           name="email"
                           value={registerData.email}
                           onChange={inputOnChangeHandler}/>
                </label>

                <label className="RegisterForm__label">password
                    <input type={showPassword === false ? 'password' : 'text'}
                           className="RegisterForm__input"
                           name="password"
                           value={registerData.password}
                           onChange={inputOnChangeHandler}/>
                    <span className="RegisterForm__eye-icon"
                          onMouseDown={showPasswordHandler}
                          onMouseUp={showPasswordHandler}

                    ><FontAwesomeIcon icon={faEye}/></span>
                </label>

                <label className="RegisterForm__label">provide password
                    <input type={showPassword === false ? 'password' : 'text'}
                           className="RegisterForm__input"
                           name="providePassword"
                           value={registerData.providePassword}
                           onChange={inputOnChangeHandler}/>
                    <span className="RegisterForm__eye-icon"
                          onMouseDown={showPasswordHandler}
                          onMouseUp={showPasswordHandler}

                    ><FontAwesomeIcon icon={faEye}/></span>
                </label>

                <div className="RegisterForm__button-wrapper">
                    <button className="RegisterForm__button" type="submit">register</button>
                </div>
            </form>
        </div>
    );
}