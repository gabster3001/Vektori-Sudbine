import React from 'react';
import './Button.css';
import { useNavigate } from 'react-router-dom'; // Using useNavigate for routing in v6

// Define the props interface
interface ButtonProps {
    text: string;  // `text` should be a string
    route: string; // `route` should be a string representing the path
}

const Button: React.FC<ButtonProps> = ({ text, route }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(route); // Navigate to the specified route
    };

    return (
        <button className="custom-button" onClick={handleClick}>
            {text}
        </button>
    );
};

export default Button;
