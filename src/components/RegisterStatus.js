import React from 'react';

import './RegisterStatus.css'

export const RegisterStatus = props => {

    return (
        <div className={props.classes}>
            <p>
                {props.content}
            </p>
        </div>
    );
}