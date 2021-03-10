import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import Cweet from "components/Cweet";
import CweetFactory from "components/CweetFactory";

const Home = ({ userObj }) => {
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

  return (
    <div>
      <CweetFactory userObj={userObj} />
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
