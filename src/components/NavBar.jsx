import React from 'react'
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
const NavBar = () => {
  return (
    <Nav
    className='d-flex justify-content-center my-5'
    activeKey="/home"
    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  >
    <Nav.Item>
      <Nav.Link as={Link} to='/' className='colorText'>Blog Page</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/Dashboard'  className='colorText'>Dashboard</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/Login'  className='colorText'>Login</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link  as={Link} to='/CreateAccount'  className='colorText'>Create Account</Nav.Link>
    </Nav.Item>
    
  </Nav>
  )
}

export default NavBar
