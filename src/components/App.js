import { useState } from "react";
import { authService } from "myBase";
import AppRouter from "components/Router";

function App() {
  // 로그인 유저 확인
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
