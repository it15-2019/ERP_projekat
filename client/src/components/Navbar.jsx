import { Badge, Button } from "@material-ui/core";
import { ShoppingCartOutlined, ExitToAppOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { userRequest } from "../requestMethods";

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
  margin-right: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
        <Link to="/cart">
          <Button>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined color="black"/>
            </Badge>
          </Button>
          </Link>
        </Left>
        <Center>
            <Logo>PČELICA CAJA</Logo>
        </Center>
        <Right>
          { user? 
          (
            <>
              <MenuItem>{user.username}</MenuItem>
              <Button onClick={handleClick}>
                <ExitToAppOutlined />
              </Button>
            </> 
          ) : 
            <Link to="/login">
              <Button>LOG IN</Button>
            </Link>
          } 
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
