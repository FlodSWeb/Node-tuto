import { useEffect, useState } from "react";
import LikeItem from "./LikeItem";
import axios from "axios";
import DeleteItem from "./DeleteItem";
import { useDispatch, useSelector } from "react-redux";
import { editItem, getItems } from "../feature/item.slice";

const Item = ({ item }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (item.author === userId) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [userId]);

  const dateFormatter = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("fr-FR", options);
  };

  const handleModif = async () => {
    if (newMessage) {
      await axios.put("http://localhost:5000/" + item._id, {
        // message: document.querySelector("#edit-msg").value,
        message: newMessage,
      });
      dispatch(editItem([newMessage, item._id]));
      setIsEdit(false);
    }
  };

  return (
    <>
      <div className="item-card">
        <h3>{item.author}</h3>

        {isEdit ? (
          <div className="edit-container">
            {/* <textarea id="edit-msg" defaultValue={item.message}></textarea> */}
            <textarea
              defaultValue={newMessage ? newMessage : item.message}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button id="edit-btn" onClick={() => handleModif()}>
              Modifier
            </button>
          </div>
        ) : (
          <p>{newMessage ? newMessage : item.message}</p>
        )}

        <LikeItem item={item} userId={userId} />
        <p>{dateFormatter(item.createdAt)}</p>
        <div className="card-icons-container">
          {isAuthor && (
            <div className="update-btn-container">
              <span id="update-btn" onClick={() => setIsEdit(!isEdit)}>
                &#10000;
              </span>
            </div>
          )}
          <DeleteItem itemId={item._id} />
        </div>
      </div>
    </>
  );
};

export default Item;
