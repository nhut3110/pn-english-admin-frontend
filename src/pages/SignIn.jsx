import React from "react";
import { Login } from "../components";

const SignIn = ({ setLogin }) => {
  return (
    <div>
      <Login setLogin={setLogin} />
    </div>
  );
};

export default SignIn;
