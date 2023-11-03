import { Container, Row, Col } from "react-bootstrap";
import "../src/CSS/App.css";
import Dashboard from "./components/Dashboard";
import BlogPage from "./components/BlogPage";
import CreateAccount from "./components/CreateAccount";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ColorChange from "./components/ColorChange";
import "../src/CSS/ColorChange.css"
import Footer from "./components/Footer";

function App() {

  
  return (
    
    <BrowserRouter>
    <ColorChange />
    <Container>
      <Row>
        <Col>
          <h1 className="titleText colorText">Bloop</h1>
        </Col>
       
         
        <NavBar/>
        {/* <Login/> */}
        {/* <CreateAccount/> */}
        {/* <BlogPage/> */}
        {/* <Dashboard /> */}

        <Routes>

          <Route path="/" element={<BlogPage/>}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/CreateAccount" element={<CreateAccount/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>

        </Routes>
        <Footer/>


      </Row>
    </Container>
   
  
    
    
    </BrowserRouter>
  );
}

export default App;
