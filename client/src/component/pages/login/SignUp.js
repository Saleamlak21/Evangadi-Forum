import axios from "../../axios";
import React, { useState } from "react";

function SignUp() {
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
      }
    } catch (error) {
      setRegistrationError(error.response.data.error);
    }
  };

  return (
    <div className="">
      <div className=" shadow-md w-full">
        <h2 className="">Login to your account</h2>
        <span>Do not have an account?<a>create a new account</a></span>
        <form onSubmit={handleSignUp} className="w-full">
          <div className="">
            <label
              htmlFor="firstname"
              className=""
            >
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className=""
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastname"
              className=""
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className=""
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className=""
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className=""
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className=""
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className=""
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className=""
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className=""
              
            />
          </div>
          {registrationError && (
            <p className="text-red-600 mb-4">{registrationError}</p>
          )}
          <button
            type="submit"
            className=""
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

// const token = response.data.token;
// // Store the token in local storage or a more secure method
// localStorage.setItem("token", token);
