import axios from "axios";
import React from "react";
import { deleteItem, getItems } from "../feature/item.slice";
import { useDispatch } from "react-redux";

const DeleteItem = ({ itemId }) => {
  const dispatch = useDispatch();

  const deleteCard = async () => {
    if (itemId) {
      confirm("Veux-tu vraiment supprimer ?") &&
        (await axios.delete("http://localhost:5000/" + itemId));
      dispatch(deleteItem(itemId));
      dispatch(getItems());
      console.log("item deleted");
    }
  };

  return (
    <span className="delete-btn" onClick={() => deleteCard()}>
      &#10008;
    </span>
  );
};

export default DeleteItem;
