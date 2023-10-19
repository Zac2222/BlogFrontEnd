import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import '../CSS/ColorChange.css'

const ColorChange = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const toggleDarkMode = () =>
    {
        setIsDarkMode(!isDarkMode)
    }
  return (
    <Button className='colorBtn' variant={isDarkMode ? 'light' : 'dark'} onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </Button>
  )
}

export default ColorChange


