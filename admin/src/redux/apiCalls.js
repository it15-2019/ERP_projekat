import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure, getProductStart, getProductSuccess,
  deleteProductFailure, deleteProductStart, deleteProductSuccess,
  updateProductFailure, updateProductStart, updateProductSuccess,
  addProductFailure, addProductStart, addProductSuccess
} from "./productRedux";
import {
  getOrderFailure, getOrderStart, getOrderSuccess,
  deleteOrderFailure, deleteOrderStart, deleteOrderSuccess,
  updateOrderFailure, updateOrderStart, updateOrderSuccess,
  addOrderFailure, addOrderStart, addOrderSuccess
} from "./orderRedux";
import { 
  loginStart, loginSuccess, loginFailure,
  logoutStart, logoutSuccess, logoutFailure,
  registerStart, registerSuccess, registerFailure,
  getUserFailure, getUserStart, getUserSuccess,
  deleteUserFailure, deleteUserStart, deleteUserSuccess,
  updateUserFailure, updateUserStart, updateUserSuccess,
  addUserFailure, addUserStart, addUserSuccess 
 } from "./userRedux";
 
export const url = "http://localhost:5000";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try 
  {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } 
  catch (err) 
  {
    dispatch(loginFailure());
  }
};

//LOGOUT
export const logout = async (dispatch) => {
  dispatch(logoutStart());
  try 
  {
    const res = await publicRequest.get("/auth/logout");
    dispatch(logoutSuccess(res.data));
  } 
  catch (err) 
  {
    dispatch(logoutFailure());
  }
};

//REGISTER
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try 
  {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } 
  catch (err) 
  {
    dispatch(registerFailure());
  }
};

// GET PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

// UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`, product);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

// ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

// GET ORDERS
export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

// DELETE ORDER
export const deleteOrder = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(res.data));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

// UPDATE ORDER
export const updateOrder = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}`, order);
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

// ADD ORDER
export const addOrder = async (order, dispatch) => {
  dispatch(addOrderStart());
  try {
    const res = await userRequest.post(`/orders`, order);
    dispatch(addOrderSuccess(res.data));
  } catch (err) {
    dispatch(addOrderFailure());
  }
};

// GET USERS
export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

// DELETE USER
export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

// UPDATE USER
export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

// ADD USER
export const addUser = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await publicRequest.post(`/users`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};
