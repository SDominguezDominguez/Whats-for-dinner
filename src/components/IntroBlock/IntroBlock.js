import React from 'react';

function IntroBlock({information, pageTitle, children}) {
    return (
        <>
            <article className="intro-block">
                <h1>{pageTitle}</h1>
                <p>
                    {information}
                </p>
                {children}
            </article>
        </>
    );
}

export default IntroBlock;