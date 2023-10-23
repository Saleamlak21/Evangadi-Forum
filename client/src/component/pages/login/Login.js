import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
import React, { useState } from "react";
import { useStateValue } from "../../../context/stateProvider";

function Login() {
  const [{ onOff, user }, dispatch] = useStateValue();
  // console.log(user)
  const navigate = useNavigate();

  const handleFormChange = () => {
    // console.log("clicked")
    dispatch({
      type: "CHANGE_FORM",
    });
  };
  // console.log(signUp)

  //-------------------this is for  login
  const [loginformData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleloginChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...loginformData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", loginformData);
      //   console.log(response);
      if (response.status === 200) {
        // Assuming that the token is returned in the response
        const token = response.data.token;
        const username = response.data.username;
        const user_id = response.data.user_id;
        // Store the token in local storage or a more secure method
        localStorage.setItem("token", token);
        // localStorage.setItem("username", username);-------------------
        dispatch({
          type: "SET_USER",
          item: { username, user_id },
        });

        navigate("/all-questions"); // Redirect to the desired page
      } else {
        // Handle login failure here, such as displaying an error message
        console.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //---------------------------------------------------------------------------------------------------------------
  // -------------this is for registration
  const [registrationError, setRegistrationError] = useState(""); // State for registration error message
  const [formData, setFormdata] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post("/api/user/register", formData);
      console.log(response);
      if (response.status === 200) {
        console.log("Registration successful");
        dispatch({
          type: "CHANGE_FORM",
        });
      }
    } catch (error) {
      setRegistrationError(error.response.data.error);
    }
  };

  // -------------------------------------------------------------------------
  return (
    <>
      <div className="customH w-5/12 bg-white  px-16 py-24 items-center text-center shadow-lg shadow-gray-600 ">
        {/* ---------------------------log in ------------ */}
        <div className={`${!onOff ? "hidden" : "block"}`}>
          <p className=" text-base font-medium my-2">Login to your account</p>
          <span className=" text-sm font-thin my-3 flex mx-auto justify-center">
            Don't have an account?{" "}
            <p
              className="cursor-pointer text-orange-400 font-medium ms-1"
              onClick={handleFormChange}
            >
              Create a new account
            </p>
          </span>
          <form onSubmit={handleSubmit} className=" my-3">
            <input
              type="email"
              id="email"
              name="email"
              value={loginformData.email}
              placeholder="Your email"
              onChange={handleloginChange}
              className="w-full border-2 rounded-sm my-2 h-9"
            />

            <input
              type="password"
              id="password"
              name="password"
              value={loginformData.password}
              placeholder="Your password"
              onChange={handleloginChange}
              className="w-full  border-2 rounded-sm my-2 h-9"
            />

            <div className="w-full text-center py-2">
              {/* <Link to="/all-questions"> */}
              <button
                type="submit"
                className="  bg-orange-400 px-10 md:px-11 py-1"
              >
                submit
              </button>
              {/* </Link> */}
            </div>
            <a>Create an account?</a>
          </form>
        </div>
        {/* -----------sign up --------------------- */}
        <div className={`${onOff ? "hidden" : "block"}`}>
          <p className=" text-lg font-medium my-2">Join the network</p>
          <span className=" text-sm font-thin my-3 flex mx-auto justify-center">
            Already have an account?
            <p
              className=" cursor-pointer text-orange-400 font-medium ms-1"
              onClick={handleFormChange}
            >
              {" "}
              Sign In
            </p>
          </span>
          <form onSubmit={handleSignUp} className="w-full">
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border-2 rounded-sm my-2 h-9"
            />

            <div className=" flex w-full justify-between">
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full border-2 rounded-sm my-2 h-9 me-1"
              />

              <input
                type="text"
                name="username"
                placeholder="Username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-2 rounded-sm my-2 h-9"
              />
            </div>

            <input
              type="text"
              name="email"
              placeholder="Email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 rounded-sm my-2 h-9"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 rounded-sm my-2 h-9"
            />
            <br />

            {registrationError && (
              <p className="text-red-600 mb-4">{registrationError}</p>
            )}
            <button
              type="submit"
              className="w-full border-0 rounded-md my-2 h-9 bg-blue-700 text-white"
            >
              Agree and Join
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
