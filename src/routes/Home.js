import React, { useEffect, useState } from "react";
import { dbService } from "myBase";

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [cweets, setCweets] = useState([]);

  useEffect(() => {
    dbService
      .collection("cweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const cweetArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCweets(cweetArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("cweets").add({
      text: cweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setCweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setCweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={cweet}
          onChange={onChange}
          type="text"
          placeholder="뭐라도 써주실래요?"
          maxLength={120}
        />
        <input type="submit" value="Cweet" />
      </form>
      <div>
        {cweets.map((cweet) => (
          <div key={cweet.id}>
            <h4>{cweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
