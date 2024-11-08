import { useEffect, useState } from "react";
import "./styles/styles.css";
import NewItem from "./components/NewItem";
import Thread from "./components/Thread";
import { useDispatch } from "react-redux";
import { getUser } from "./feature/user.slice";

const App = () => {
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  return (
    <>
      <h1>Node Tuto</h1>
      <div className="app-container">
        <div className="pseudo-container">
          <h3>USERID : </h3>
          <input
            type="text"
            placeholder="Pseudo user"
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <NewItem />
        <Thread />
      </div>
    </>
  );
};

export default App;
