import React,{useState} from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { login, GetLoggedInuser  } from '../Services/DataService';


const Login = () => {

    let navigate = useNavigate();

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');

    const handleUser = (e) => setUsername(e.target.value); 
    const handlePassword = (e) => setPassword(e.target.value); 
    const handleSubmit = async () => {
        let userData = {
            username: Username,
            password: Password
        }

        let token = await login(userData)
        console.log(userData);
        if(token.token != null)
        {
          localStorage.setItem("Token", token.token);
          GetLoggedInuser(Username);
          navigate("/Dashboard");
        }
    }; 
  return (
    <div>
      
      <Form className='accountColor' style={{width:'60%',marginLeft:"20%", padding: 80, borderRadius: 5,}}>
        <h1 className='text-center'>Login</h1>
      <Form.Group className="mb-3" controlId="Username">
        <Form.Label>Username</Form.Label>
        <Form.Control style={{background: 'skyblue'}} type="text" placeholder="Enter Username"  onChange={({target}) =>setUsername(target.value)}/>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control style={{background: 'skyblue'}} type="password" placeholder="Password"  onChange={({target}) =>setPassword(target.value)} />
      </Form.Group>
      
      <Button variant="outline-dark" onClick={handleSubmit} >
        Submit
      </Button>
      <p className='mt-2'> If you don't have an account</p>
      <Button variant="outline-dark" onClick={()=> navigate("/CreateAccount")}  >
        Create Account
      </Button>
    </Form>
    </div>
  )
}

export default Login
