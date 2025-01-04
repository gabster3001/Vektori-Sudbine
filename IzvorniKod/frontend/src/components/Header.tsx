import React from 'react';
import './Header.css'; // Add appropriate CSS styles

// Define the props interface
interface HeaderProps {
    username: string;  // `username` should be a string
    level: number;     // `level` should be a number
}

const Header: React.FC<HeaderProps> = ({ username, level }) => {
    return (
        <header className="header">
            <div className="header__logo">PRO-R</div>
            <input
                type="text"
                className="header__search"
                placeholder="Pretraži..."
                aria-label="Pretraži"
            />
            <div className="header__user-info">
                <span className="header__username">{username}</span>
                <span className="header__level">level {level}</span>
                <div className="header__icon">⭐</div> {/* Icon for level */}
            </div>
        </header>
    );
};

export default Header;
