import React, { useEffect } from "react";
import { authService, dbService } from "myBase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
  // 로그아웃 Hooks
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  // 필터링
  const getMyCweets = async () => {
    const cweets = await dbService
      .collection("cweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    console.log(cweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyCweets();
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
