import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUnlock, faLock, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';

import {LoginForm} from './LoginForm';

import './Box.css';
import {RegisterForm} from './RegisterForm';
import {RegisterStatus} from './RegisterStatus';

export const Box = props => {
//  #states:
    const [boxState, setBoxState] = useState('logging'); // 'logging' || 'success' || 'failed';
    const [showMenu, setShowMenu] = useState(false);
    const [boxContent, setBoxContent] = useState('logging'); // 'logging' || 'registration'
    const [showRegisterStatusBox, setShowRegisterStatusBox] = useState(false);
    const [registerStatusBoxContent, setRegisterStatusBoxContent] = useState('Please provide correct email address.');

//  #handlers:
    const boxClass = boxState => {
        if (boxState === 'logging') {
            return 'Box'
        } else if (boxState === 'success') {
            return 'Box Box--success'
        } else if (boxState === 'failed') {
            return 'Box Box--failed'
        } else if (boxState === 'registered') {
            return 'Box Box--success'
        } else if (boxState === 'validation') {
            return 'Box Box--failed'
        }
    }

    const logStatusClass = boxState => {
        if (boxState === 'success') {
            return 'Box__log-status-text'
        } else if (boxState === 'failed') {
            return 'Box__log-status-text Box__log-status-text--failed'
        }
    }

    const hideMenuOnBoxClickHandler = () => {
        if (showMenu === true) {
            setShowMenu(false)
        }
    }

    const registerStatusBoxHandler = (showBox, msg) => {
        setShowRegisterStatusBox(showBox);
        setRegisterStatusBoxContent(msg);
    }

    return (
        <div className={boxClass(boxState)}
             onClick={hideMenuOnBoxClickHandler}>

            <div className="Box__menu-wrapper">
                <div className="Box__menu-button"
                     onClick={() => setShowMenu(prev => prev === false)}>
                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                    {showMenu === true &&
                        <div className="Box__menu-box">
                            <div className="Box__menu-link" onClick={() => {
                                setBoxState('logging');
                                setBoxContent('logging');
                                registerStatusBoxHandler(false, '');
                            }}>
                                <p>login</p>
                            </div>
                            <div className="Box__menu-link" onClick={() => {
                                setBoxState('logging');
                                setBoxContent('registration');
                                registerStatusBoxHandler(false, '');
                            }}>
                                <p>register</p>
                            </div>
                        </div>
                    }
                </div>
            </div>

            {(boxState === 'success' || boxState === 'failed') &&
                <div className="Box__log-status-box">
                    <h2 className={logStatusClass(boxState)}>
                        {boxState === 'success' ? <FontAwesomeIcon icon={faUnlock}/> : <FontAwesomeIcon icon={faLock}/>}
                    </h2>
                </div>
            }

            {boxContent === 'logging' && <LoginForm setBoxState={setBoxState}/>}
            {boxContent === 'registration' &&
                <RegisterForm setBoxState={setBoxState}
                              showRegisterStatusBox={registerStatusBoxHandler}/>}

            {showRegisterStatusBox === true &&
                <RegisterStatus
                    classes={boxState === 'registered' ? 'RegisterStatus RegisterStatus--success' : 'RegisterStatus'}
                    content={registerStatusBoxContent}/>}
        </div>
    );
};