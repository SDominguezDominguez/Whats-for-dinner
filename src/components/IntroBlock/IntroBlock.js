import React from 'react';
import './IntroBlock.css';

function IntroBlock({pageTitle, information, children}) {
    return (
        <>
            <article className="intro-block">
                <div className="intro-center">
                    <h1>{pageTitle}</h1>
                    <p>
                        {information}
                    </p>
                </div>
                {children}
            </article>
        </>
    );
}

export default IntroBlock;