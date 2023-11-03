import React,{useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { createAccount } from '../Services/DataService';
import Login from './Login';
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {


    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    // const handleUser = (e) => setUsername(e.target.value); 
    // const handlePassword = (e) => setPassword(e.target.value); 
    const handleSubmit = () => {
        let userData = {
            Id: 0,
            Username,
            Password
        }
        createAccount(userData);
        console.log(userData);
    } 
  return (
    <div>
      
      <Form className='accountColor' style={{width:'60%',marginLeft:"20%",backgroundColor: "blueviolet",padding:80, borderRadius: 5,}}>
        <h1 className='text-center'>Create Account</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control style={{background: 'skyblue'}} type="text" placeholder="Enter Username"  onChange={({target}) =>setUsername(target.value)}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{background: 'skyblue'}} type="password" placeholder="Password" onChange={({target}) =>setPassword(target.value)} />
      </Form.Group>
      
      <Button variant="outline-dark" onClick={handleSubmit} >
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default CreateAccount
