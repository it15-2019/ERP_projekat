import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.vecteezy.com/system/resources/previews/010/695/588/non_2x/cute-seamless-pattern-with-little-bees-wrapping-paper-pattern-patterns-for-decoration-bees-and-honeycombs-free-vector.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
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
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
  min-width: 50%;
  margin-top: 10px;
  padding: 10px;
  align-items: center;
`;

const Button = styled.button`
  width: 30%;
  border: none;
  padding: 15px 20px;
  margin: 10px;
  background-color: orange;
  color: white;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user); 

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, { firstName, lastName, username, email, password});
  };

  return (
    <Container>
      <Wrapper>
        <Form>
          <Title>CREATE AN ACCOUNT</Title>
          <Input placeholder="First name" onChange={(e) => setFirstName(e.target.value)}/>
          <Input placeholder="Last name" onChange={(e) => setLastName(e.target.value)}/>
          <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <Input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
          <Button onClick={handleClick} disabled={isFetching}>
            CREATE
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <p>If you have account, log in <Link to="/login">HERE</Link></p>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
