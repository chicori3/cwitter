import React, { useState } from "react";
import { dbService } from "myBase";

const Cweet = ({ cweetObj, isOwner }) => {
  // edit 상태 확인
  const [editing, setEditing] = useState(false);
  const [newCweet, setNewCweet] = useState(cweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      // delete
      dbService.doc(`cweets/${cweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    await dbService.doc(`cweets/${cweetObj.id}`).update({
      text: newCweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewCweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={newCweet}
              required
              placeholder="Edit your Cweet"
              onChange={onChange}
            />{" "}
            <input type="submit" value="Update Cweet" />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
        </>
      ) : (
        <>
          {" "}
          <h4>{cweetObj.text}</h4>
          {cweetObj.attachmentUrl && (
            <img
              src={cweetObj.attachmentUrl}
              alt="img"
              width="50px"
              height="50px"
            />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Cweet</button>
              <button onClick={toggleEditing}>Edit Cweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Cweet;
