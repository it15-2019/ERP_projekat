import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  
  return (
    <Router>
      <Switch>
        {user ? 
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                {!user ? <Redirect to="/login" /> : <Home />}
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <OrderList/>
              </Route>
              <Route path="/order/:orderId">
                <Order/>
              </Route>
            </div>
          </>
        : <Login />}
      </Switch>
    </Router>
  );
}

export default App;
