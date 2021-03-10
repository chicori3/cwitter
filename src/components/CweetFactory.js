import React, { useState } from "react";
import { dbService, storageService } from "myBase";
import { v4 as uuidv4 } from "uuid";

const CweetFactory = ({ userObj }) => {
  const [cweet, setCweet] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const cweetObj = {
      text: cweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection("cweets").add(cweetObj);
    setCweet("");
    setAttachment("");
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

  const onClearAttachment = () => {
    setAttachment(null);
  };

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
        <button onClick={onClearAttachment}>Clear</button>
      </div>
    )}
  </form>;
};

export default CweetFactory;
