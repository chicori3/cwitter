import { useEffect, useState } from "react";
import { authService } from "myBase";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // firebase 초기화
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Loading..."
      )}
      <footer>&copy; {new Date().getFullYear()} Cwitter</footer>
    </>
  );
}

export default App;
