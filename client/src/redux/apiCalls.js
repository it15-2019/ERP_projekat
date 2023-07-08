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
import { publicRequest } from "../requestMethods";

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

