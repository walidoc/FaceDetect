import React from "react";

const Navigation = ({ onSignout }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer'
               onClick={onSignout} > Sing out 
            </p>
        </nav>
    )
}

export default Navigation;