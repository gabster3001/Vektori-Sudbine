import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./PageNotFound.css";

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='pgNotFound'>
      <h1>404: Page Not Found</h1>
      <button className='backHomebutton'
        onClick={() => navigate('/')}>
        Povratak na početnu stranicu
      </button>
    </div>
  );
};

export default PageNotFound;
