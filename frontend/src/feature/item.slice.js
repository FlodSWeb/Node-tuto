import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk("getPosts", async (_, thunkAPI) => {
  axios
    .get("http://localhost:5000/")
    .then((res) => thunkAPI.dispatch(getItemsSuccess(res.data)));
});

export const itemSlice = createSlice({
  name: "items",
  initialState: {
    itemsData: [],
  },
  reducers: {
    getItemsSuccess: (state, { payload }) => {
      state.itemsData = payload;
    },
    createItem: (state, { payload }) => {
      state.itemsData.push(payload);
    },
    editItem: (state, { payload }) => {
      state.itemsData = state.itemsData.map((item) => {
        if (item._id === payload[1]) {
          return {
            ...item,
            message: payload[0],
          };
        } else {
          return item;
        }
      });
    },
    deleteItem: (state, { payload }) => {
      state.itemsData = state.itemsData.filter((item) => item._id !== payload);
    },
    likeItem: (state, { payload }) => {
      state.itemsData = state.itemsData.map((item) => {
        if (item._id === payload[1]) {
          // item.likers.forEach((liker) => console.log(liker));
          return {
            ...item,
            likers: [...item.likers, payload[0]],
          };
        } else {
          return item;
        }
      });
    },
    unlikeItem: (state, { payload }) => {
      state.itemsData = state.itemsData.map((item) => {
        if (item._id === payload[1]) {
          return {
            ...item,
            likers: item.likers.filter((userId) => userId !== payload[0]),
          };
          // console.warn("unlike");
        } else {
          return item;
        }
      });
    },
  },
});

export const {
  getItemsSuccess,
  createItem,
  editItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = itemSlice.actions;
export default itemSlice.reducer;
