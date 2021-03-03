import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "myBase";
import Cweet from "components/Cweet";

const Home = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [cweets, setCweets] = useState([]);
  const [attachment, setAttachment] = useState();

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
    const fireRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fireRef.putString(attachment, "data_url");
    // await dbService.collection("cweets").add({
    //   text: cweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });

    // setCweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setCweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearFile = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Cweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="img" width="50px" height="50px" />
            <button onClick={onClearFile}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {cweets.map((cweet) => (
          <Cweet
            key={cweet.id}
            cweetObj={cweet}
            isOwner={cweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
