import React from "react";

const Header = () => {

    let valuee = 1;
    return (
        <header >
            <span className="GW">Gameweek</span>
            <input type="text" className="gwNumber" />
            <span className="pts">PTS</span>
        </header>
    );
}

export default Header;