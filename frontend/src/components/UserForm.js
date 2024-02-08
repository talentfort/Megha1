import React, { useState } from "react";
import Primal from "../assets/Primal.jpeg";
import Logo from "../assets/Logo.png";
import { signup } from "../api/api";
import Loader from "./Loader";

function UserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "Doctor";
  const status = "true";
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const userSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await signup(email, password, role, status);
      if (response.message) {
        setSuccessMessage("Registration successful!");
      
      } else {
        setErrorMessage("Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
  };

  return (
    <div>
      {loading && <Loader />}
      <div className="flex flex-col flex-auto w-full h-screen">
        <div className="h-full">
          <div className="grid grid-cols-3 h-full">
            <div
              className="bg-green-700 bg-contain lg:flex bg-no-repeat hidden h-full"
              style={{ backgroundImage: `url(${Primal})` }}
            >
              <div className="p-4 text-white flex flex-col justify-end items-end">
                <div className="flex items-center justify-center">
                  <img
                    src={Logo}
                    alt="logo"
                    className="w-[250px] h-[100px] mb-5 ml-[100px] justify-center"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2 flex justify-center items-center">
              <div className="min-w-[450] px-8">
                <div className="mb-8">
                  <h2 className="text-3xl text-yellow-500 font-extrabold">
                    Welcome to MEGHA1
                  </h2>
                  <p className="text-slate-800">Signup As Doctor</p>
                  {errorMessage && (
                  <p className="text-red-500">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                </div>
                <form onSubmit={userSignup}>
                  <div className="mb-3">
                    <label className="font-medium mb-2">Email</label>
                    <input
                      type="text"
                      id="email"
                      placeholder="Enter your Email address"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="font-medium mb-2">Password</label>
                    <input
                    id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <div className="flex justify-between mb-6">
                    <label>
                      <input type="checkbox" className="mr-2" />
                      Remember me
                    </label>
                    <span>Forgot password?</span>
                  </div> */}
                  <button
                    type="submit"
                    className="block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded"
                  >
                    Sign Up
                  </button>
                </form>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
