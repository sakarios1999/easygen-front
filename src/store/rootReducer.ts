import { combineReducers, Reducer } from "redux";

import { loginReducer } from "../features/landing/landing.slice";

/**
 * Combines reducers of all slices and router into one root reducer
 *
 * @param routerReducer router reducer for redux first history
 */
const createRootReducer = (routerReducer: Reducer) =>
  combineReducers({
    router: routerReducer,
    landing: loginReducer,
  });
export default createRootReducer;
