import {tokenReducer }from "./tokenReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  tokenReducer: tokenReducer,
});

export default rootReducer;
