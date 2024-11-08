import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeItem, unlikeItem } from "../feature/item.slice";

const LikeItem = ({ item }) => {
  const [userLiked, setUserLiked] = useState(false);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    item.likers.includes(userId) ? setUserLiked(true) : setUserLiked(false);
  }, [userId, userLiked]);

  const likePost = async () => {
    if (userId !== "") {
      await axios.patch("http://localhost:5000/like/" + item._id, {
        userId,
      });
      // .then(() => console.log("dans la fonction"))
      // .catch((err) => console.error(err));
      dispatch(likeItem([userId, item._id]));
      setUserLiked(true);
      // console.warn("likePost()");
      // console.log(userId);
      // console.log("userLiked :: ", userLiked);
      // console.log("item.likers ::: ", item.likers);
    } else {
      alert("Veuillez entrer un pseudo");
    }
  };

  const unlikePost = async () => {
    await axios.patch("http://localhost:5000/unlike/" + item._id, {
      userId,
    });
    // .then(() => console.log("dans la fonction"))
    // .catch((err) => console.error(err));
    dispatch(unlikeItem([userId, item._id]));
    setUserLiked(false);
    // console.warn("unlikePost()");
    // console.log(userId);
    // console.log("userLiked :: ", userLiked);
    // console.log("item.likers ::: ", item.likers);
  };

  return (
    <>
      <div className="like-icon">
        <p>Likes : {item.likers.length}</p>
        {userLiked ? (
          <span id="like-btn" onClick={() => unlikePost()}>
            &#9829;
          </span>
        ) : (
          <span id="unlike-btn" onClick={() => likePost()}>
            &#9829;
          </span>
        )}
      </div>
    </>
  );
};

export default LikeItem;
