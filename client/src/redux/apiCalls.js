import { 
  loginStart,
  loginSuccess,
  loginFailure,
  logoutStart,
  logoutSuccess,
  logoutFailure,
  registerStart, 
  registerSuccess, 
  registerFailure 
 } from "./userRedux";
 import {
  createCartStart,
  createCartSuccess,
  createCartFailure,
  clearCart,
  deleteCartStart,
  deleteCartSuccess,
  deleteCartFailure
 } from "./cartRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const url = "http://localhost:5000";

// LOGIN
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

// LOGOUT
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

// REGISTER
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

// CREATE CART
export const createCart = async (dispatch, cart) => {
  dispatch(createCartStart());
  try 
  {
    const res = await userRequest.post("/carts", cart);
    dispatch(createCartSuccess(res.data));
  } 
  catch (err) 
  {
    dispatch(createCartFailure());
  }
};

// DELETE CART
export const deleteCart = async (id, dispatch) => {
  dispatch(deleteCartStart());
  try 
  {
    const res = await userRequest.delete(`/carts/${id}`);
    dispatch(deleteCartSuccess(res.data));
    clearCart();
  } 
  catch (err) 
  {
    dispatch(deleteCartFailure());
  }
};

