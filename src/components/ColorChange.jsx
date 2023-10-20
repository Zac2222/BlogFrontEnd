import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import '../CSS/ColorChange.css';

const ColorChange = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  //useEffect to check and change the body element directly to get the color to work
  useEffect(() => { 
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div>
      <Button className='colorBtn' variant={isDarkMode ? 'light' : 'dark'} onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </Button>
    </div>
  );
};

export default ColorChange;






