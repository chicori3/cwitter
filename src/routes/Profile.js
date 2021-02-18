import React from "react";
import { authService } from "myBase";
import { useHistory } from "react-router-dom";

const Profile = () => {
  // 로그아웃 Hooks
  const history = useHistory();

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
