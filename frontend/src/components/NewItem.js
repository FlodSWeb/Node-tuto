import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createItem, getItems } from "../feature/item.slice";

const NewItem = () => {
  const [message, setMessage] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  // useEffect(() => console.log(userId), [userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/", {
        message,
        author: userId,
      })
      .then((data) => {
        dispatch(createItem(data.data));
        // get ID créé par MongoDB
        dispatch(getItems());
      });
    // .then((response) => {
    //   console.log(response.data);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
    console.log("item ajouté");
  };

  return (
    <>
      <form className="newItemForm-container" onSubmit={(e) => handleSubmit(e)}>
        <textarea
          placeholder="Message de l'Item"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <input type="submit" value="Ajouter l'Item" />
      </form>
    </>
  );
};

export default NewItem;
