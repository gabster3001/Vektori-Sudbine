import React from 'react';
import './Header.css'; 


interface HeaderProps {
    username: string;  
    level: number;     
}

const Header: React.FC<HeaderProps> = ({ username, level }) => {
    return (
        <header className="header">
            <div className="header__logo">PRO-R</div>
            
            <div className="header__user-info">
                <span className="header__username">{username}</span>
                <span className="header__level">level {level}</span>
                <div className="header__icon">⭐</div> 
            </div>
        </header>
    );
};

export default Header;
