import { useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import "./order.css";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../redux/apiCalls";

export default function Order() {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const history = useHistory();

  const order = useSelector((state) => 
    state.order.orders.find((order) => order._id === orderId));

  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    
    const order = { ...inputs };
    updateOrder(orderId, order, dispatch);  
    history.push('/orders');
  };  

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Order</h1>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Order ID</label>
            <span className="spanText">{order._id}</span>
            <label>Total</label>
            <span className="productInfoKey">{order.total} RSD</span>
            <div className="newUserGender">
              <label>Delivery status</label>
              <input type="radio" name="delivery_status" value="delivered" onChange={handleChange} defaultChecked={order.delivery_status === "delivered"}/>
              <span className="span1">Delivered</span>
              <input type="radio" name="delivery_status" value="pending" onChange={handleChange} defaultChecked={order.delivery_status === "pending"}/>
              <span className="span2">Pending</span>
              <input type="radio" name="delivery_status" value="cancelled" onChange={handleChange} defaultChecked={order.delivery_status === "cancelled"}/>
              <span className="span3">Cancelled</span>
            </div>
          </div>
          <div className="productFormRight">
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
