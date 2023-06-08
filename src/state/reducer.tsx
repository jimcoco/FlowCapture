import { combineReducers } from "@reduxjs/toolkit";

import networksel from "./networks"; 
import addressel from "./address";

const rootReducer = combineReducers({
   networksel,
   addressel,
});

export default rootReducer;
