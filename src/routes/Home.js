import React, { useState } from "react";
import { dbService } from "myBase";

const Home = () => {
  const [cweet, setCweet] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("cweets").add({
      cweet,
      createdAt: Date.now(),
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
    </div>
  );
};
export default Home;
