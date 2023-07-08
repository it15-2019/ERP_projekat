import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart } from "../redux/cartRedux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://static.vecteezy.com/system/resources/previews/010/695/588/non_2x/cute-seamless-pattern-with-little-bees-wrapping-paper-pattern-patterns-for-decoration-bees-and-honeycombs-free-vector.jpg")
      center;
  background-size: cover;

  h2 {
    margin-bottom: 0.5rem;
    color: black;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 15px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;


const Success = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order might take some time to process.</p>
      <p>Check your order status at your profile after about 10mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support@onlineshop.com</strong>
      </p>
      <Link to="/">
      <Button>
            GO BACK TO SHOP
        </Button>
      </Link>
    </Container>
  );
};

export default Success;
