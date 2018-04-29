import React from "react";
import Logo from "../Logo/Logo"


const Navigation = ({ onSignout }) => {
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between'}}>
            <Logo />
            <p className='f3 link dim black underline pa3 pointer'
               onClick={onSignout} > Sing out 
            </p>
        </nav>
    )
}

export default Navigation;