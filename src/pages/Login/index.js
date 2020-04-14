import React, { useCallback, useContext } from "react";
import firebase from "firebase"
import { withRouter, Redirect } from "react-router";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import app from "../../base";
import { AuthContext } from "../../Auth";



const Login = ({ history }) => {
  
  const { currentUser } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ]
  }

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h1>Log in</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()}/>
    </div>
  );
};

export default withRouter(Login);