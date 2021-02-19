import React, { useState } from "react";

const Home = () => {
  const [cweet, setCweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setCweet(value);
  };

  return (
    <div>
      <form>
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
