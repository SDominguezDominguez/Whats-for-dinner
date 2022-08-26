import React from 'react';
import "./Button.css";

function Button({type, onClickHandler, buttonText}) {
    return (
        <button
            type={type}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>
    );
}

export default Button;