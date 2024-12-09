import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
    text: string;       // Button text
    route: string;      // Route to navigate to
    color?: string;     // Optional: Button background color
    textColor?: string; // Optional: Button text color
}

const Button: React.FC<ButtonProps> = ({ text, route, color = '#007BFF', textColor = '#FFFFFF' }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route); // Navigate to the specified route
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

