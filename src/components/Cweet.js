import React, { useState } from "react";
import { dbService, storageService } from "myBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Cweet = ({ cweetObj, isOwner }) => {
  // edit 상태 확인
  const [editing, setEditing] = useState(false);
  const [newCweet, setNewCweet] = useState(cweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠어요?");
    if (ok) {
      await dbService.doc(`cweets/${cweetObj.id}`).delete();
      await storageService.refFromURL(cweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

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
    <div className="cweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container cweetEdit">
            <input
              type="text"
              value={newCweet}
              required
              placeholder="수정"
              onChange={onChange}
              autoFocus
              className="formInput"
            />{" "}
            <input type="submit" value="Update Cweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{cweetObj.text}</h4>
          {cweetObj.attachmentUrl && <img src={cweetObj.attachmentUrl} />}
          {isOwner && (
            <div class="cweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cweet;
