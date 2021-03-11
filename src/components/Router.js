import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const SwitchContainer = styled.div`
  max-width: 890;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        <SwitchContainer>
          <Route exact path="/">
            <Home userObj={userObj} />
          </Route>
          <Route exact path="/profile">
            <Profile userObj={userObj} refreshUser={refreshUser} />
          </Route>
        </SwitchContainer>
        ) : (
        <>
          <Route exact path="/">
            <Auth />
          </Route>
          {/* <Redirect from="*" to="/" /> */}
        </>
        )
      </Switch>
    </Router>
  );
};

export default AppRouter;
