import { useState } from "react";
import styled from "styled-components";
import { login } from "../../redux/apiCalls";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: orange;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: teal;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;
  
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error } = useSelector((state) => state.user);


  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
    history.push('/');
    history.push('/');
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>LOG IN (ADMIN)</Title>
        <Form>
          <Input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} required="true"/>
          <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required="true"/>
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          { error && <Error>Username or password are not valid... Try again</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};
  
export default Login;
