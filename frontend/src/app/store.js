import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/user.slice.js";
import itemsReducer from "../feature/item.slice.js";

export default configureStore({
  reducer: {
    user: userReducer,
    items: itemsReducer,
  },
});
