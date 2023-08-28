import { Button } from "@material-ui/core";
import { ExitToAppOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";
import { Link, useHistory } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color: orange;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 20px;
  margin-left: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const Topbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    logout(dispatch);
    history.push('login');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to={"/user/" + user._id}>
          <Button>
            <Image src={user.img}/>
          </Button>
          </Link>
          <MenuItem>{user.username}</MenuItem>
        </Left>
        <Center>
            <Logo>PČELICA CAJA</Logo>
        </Center>
        <Right>
          <Link to = "/login">
          <Button onClick={handleClick}>
            <ExitToAppOutlined/>
          </Button>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Topbar;
