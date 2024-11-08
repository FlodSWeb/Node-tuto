import React, { useEffect, useState } from "react";
import axios from "axios";
import Item from "./Item";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../feature/item.slice";

const Thread = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.itemsData);

  useEffect(() => {
    axios.get("http://localhost:5000/").then(() => dispatch(getItems()));
  }, []);

  return (
    <>
      <div className="thread-container">
        {items &&
          items
            .slice() // à mettre à cause de Redux
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((item) => <Item key={item._id} item={item} />)}
      </div>
    </>
  );
};

export default Thread;
