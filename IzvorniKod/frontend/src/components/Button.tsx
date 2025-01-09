import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    text: string;       
    route: string;     
    color?: string;     
    textColor?: string; 
}

const Button: React.FC<ButtonProps> = ({ text, route, color = '#007BFF', textColor = '#FFFFFF' }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route);
    }; 

    return (
        <button
            className="custom-button"
            onClick={handleClick}
            style={{
                backgroundColor: color,
                color: textColor,
            }}
        >
            {text}
        </button>
    );
};

export default Button;

