import styled from "styled-components";
import { mobile } from "../responsive";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/dgvykhrlm/image/upload/v1679082122/Screenshot_2023-03-18_011246_crndvf.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email] = useState("");
  

  async function submit(e){
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/register",{
        username,email,password
      })
    }catch(e){
      console.log(e)
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input  placeholder="username"
          onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="email"
          onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password" />
          <Agreement>
          By creating an account, I consent to the processing of my personal
          data
          </Agreement>
          <Button >CREATE</Button>
          <Link to="/login">Login</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
