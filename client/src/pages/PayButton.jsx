import axios from "axios";
import { useSelector } from "react-redux";
import { url } from "../redux/apiCalls";
import styled from "styled-components";


const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.user.currentUser);

  const handleCheckout = () => {
    axios
      .post(`${url}/stripe/create-checkout-session`, 
      {
        cartItems,
        userId: user._id,
      })
      .then((response) => 
      {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Button onClick={() => handleCheckout()}>CHECK OUT</Button>
    </>
  );
};

export default PayButton;
