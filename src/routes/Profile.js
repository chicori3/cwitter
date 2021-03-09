import React, { useEffect, useState } from "react";
import { authService, dbService } from "myBase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  // 로그아웃 Hooks
  const history = useHistory();

  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // *photo url 업로드하기
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  // // 필터링
  // const getMyCweets = async () => {
  //   const cweets = await dbService
  //     .collection("cweets")
  //     .where("creatorId", "==", userObj.uid)
  //     .orderBy("createdAt")
  //     .get();

  //   console.log(cweets.docs.map((doc) => doc.data()));
  // };

  // useEffect(() => {
  //   getMyCweets();
  // });

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
