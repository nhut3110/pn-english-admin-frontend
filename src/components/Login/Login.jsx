// import "../style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import "./Login.css";
import AuthService from "../../services/auth.service";

const Login = ({ setLogin }) => {
  const userEmail = useRef();
  const userPassword = useRef();

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    // try {
    //   const res = await axios.post(
    //     "http://dev.thanqminh.com:3000/auth/sign_in",
    //     {
    //       email: userEmail.current.value.toString(),
    //       password: userPassword.current.value.toString(),
    //     }
    //   );
    //   console.log(res);
    //   // setUser({});
    //   localStorage.setItem(
    //     "task-user",
    //     JSON.stringify({
    //       dataUser: res.data,
    //       uid: res.headers["uid"],
    //       access_token: res.headers["access-token"],
    //       client: res.headers["client"],
    //     })
    //   );
    //   console.log(JSON.parse(localStorage.getItem("task-user")));
    //   navigate("/profile");
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      AuthService.login(
        userEmail.current.value.toString(),
        userPassword.current.value.toString()
      ).then((res) => {
        console.log(res);
        setLogin(true);
        navigate("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="container sign-up-mode ">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="/" class="sign-up-form">
              <h2 class="title">Welcome back!</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input type="text" placeholder="Email" ref={userEmail} />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  ref={userPassword}
                />
              </div>
              <input
                type="submit"
                value="Login"
                class="btn solid "
                onClick={handleSignin}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
