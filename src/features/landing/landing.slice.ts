import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import { ACCEPT } from "../../config/header";
import { EASYGEN_BASE_URL } from "../../config/url";
import { Login, SignIn, SignUp } from "./landing.type";

/**
 * Initial state object
 */
const initialState: Login = {
  isLoggedIn: false,
  username: undefined,
  token: undefined,
  email: undefined,
};

/**
 * Register api call thunk
 */
const register = createAsyncThunk(
  "register",
  async ({ email, password, name }: SignUp, { rejectWithValue }) => {
    const pathname = "/users";
    const headers = { Accept: ACCEPT };

    const body: SignUp = {
      name: name,
      email: email.toLowerCase().trim(),
      password: password,
    };

    try {
      const response = await trackPromise(
        axios.post(EASYGEN_BASE_URL.concat(pathname), body, { headers })
      );
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

/**
 * Login api call thunk
 */
const logIn = createAsyncThunk(
  "login/loginStatus",
  async ({ username, password }: any, { rejectWithValue }) => {
    const pathname = "/users/login";
    const headers = { Accept: ACCEPT };

    const body: SignIn = {
      email: username.toLowerCase().trim(),
      password: password,
    };

    try {
      const response = await trackPromise(
        axios.post(EASYGEN_BASE_URL.concat(pathname), body, { headers })
      );
      return response;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const logOut = createAsyncThunk("logout", async (_, { dispatch }) => {
  // Dispatch all reset actions needed here
  dispatch(loginActions.reset());
});

/**
 * Feature slice Object
 * Automatically generates actions as per reducers
 */
const loginSlice = createSlice({
  /** Unique feature name */
  name: "login",

  /** Initial state object */
  initialState: initialState,

  /** Reducers are functions that determine changes to an application's state. */
  reducers: {
    setLogin: (state, action) => {
      return { ...state, ...action.payload };
    },
    reset: () => initialState,
  },

  /**
   * Extra reducers are for handling action types.
   * Here thunk actions are handled
   */
  extraReducers: (builder) => {
    builder.addCase(logIn.rejected, (state, { payload, error }: any) => {
      state.isLoggedIn = false;
      message.error(payload?.message);
    });

    builder.addCase(logIn.fulfilled, (state, { payload, error }: any) => {
      const token = payload?.data?.userResponse?.token;
      state.isLoggedIn = true;
      state.token = token;
    });
  },
});

/**
 * Reducers are exported so they could be added to store
 */
export const loginReducer = loginSlice.reducer;

/**
 * Actions hold the same names as reducers.
 * Actions can be dispached using 'useDispacth' hook,
 * or by 'mapDispatchToProps' in the redux 'connect' function
 */
export const loginActions = {
  ...loginSlice.actions,
  logIn,
  register,
  logOut,
};
