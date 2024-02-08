import React, { useState } from "react";
import med1 from "../assets/med1.png";
import { createProduct, signup } from "../api/api";
import Loader from "./Loader";
import { Link } from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pharmacyaName, setPharmacyaName] = useState("");
  const [pharmacyaLocation, setPharmacyLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const role = "PharmacyUser";
  const status = "false";
  const [loading, setLoading] = useState(false);

  const userSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(
        email,
        password,
        role,
        status,
        pharmacyaName,
        pharmacyaLocation
      );
  
      const productData1 = {
        name: "MeGha1 Primal Intake",
        description: "MeGha Primal Intake is a food supplement developed by a team of Scientists, Western Doctors, Ayurvedic Doctors, and Indigenous Doctors, after years of research and development to fight Viruses.",
        quantity: 0,
        price: 600,
        pharmacyMail: email,
        pharmacyName: pharmacyaName,
      };
  
      const productData2 = {
        name: "MeGha1 Vac Recover",
        description: "MeGha Vac Recover is a food supplement developed by a team of Scientists, Western Doctors, Ayurvedic Doctors, and Indigenous Doctors, after years of research and development to Detoxify the Human body.",
        quantity: 0,
        price: 800,
        pharmacyMail: email,
        pharmacyName: pharmacyaName,
      };

      const productData3 = {
        name: "MeGha1 Liyana",
        description: "Make the switch to a healthier, more natural way of dealing with menstrual pain. Try Liyana today and discover the difference for yourself.",
        quantity: 0,
        price: 800,
        pharmacyMail: email,
        pharmacyName: pharmacyaName,
      };


   
      
  
      await createProduct(productData1);
      await createProduct(productData2);
      await createProduct(productData3);

     

  
      setSuccessMessage("Registration successful!");
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      document.getElementById("pharmacyaName").value = "";
      document.getElementById("pharmacyaLocation").value = "";
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred during registration. Please try again.");
      setLoading(false);

    }
  };
  
  return (
    <div>
       {loading ?   <Loader/> : null}
  
      <div className="flex flex-col flex-auto w-full h-screen">
        <div className="h-full">
          <div className="grid grid-cols-3 h-full">
            <div
              className="bg-green-700 bg-contain lg:flex bg-no-repeat hidden"
              style={{ backgroundImage: `url(${med1})` }}
            ></div>
            <div className="col-span-2 flex justify-center items-center">
              <div className="min-w-[450] px-8">
                <div className="mb-8">
                  <h2 className="text-3xl text-yellow-500 font-extrabold">
                    Welcome to MEGHA1
                  </h2>
                  <p className="text-slate-800">Register As Pharmacist</p>
                  {successMessage && (
                    <div className="text-green-600">{successMessage}</div>
                  )}
                  {errorMessage && (
                    <div className="text-red-600">{errorMessage}</div>
                  )}
                </div>
                <form onSubmit={userSignup}>
                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">Email</label>
                    <input
                    id="email"
                      type="text"
                      placeholder="Enter your Email address"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">
                      Pharmacy Name
                    </label>
                    <input
                      type="text"
                      id="pharmacyaName"
                      placeholder="Enter your Pharmacy name"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setPharmacyaName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">
                      Pharmacy Location
                    </label>
                    <input
                      type="text"
                      id="pharmacyaLocation"
                      placeholder="Enter your location"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setPharmacyLocation(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">Password</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-between mb-6">
                    <label>
                      <input type="checkbox" className="mr-2" />
                      Remember me
                    </label>
                    <span>Forgot password?</span>
                  </div>
                  <button
                    className="block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded"
                    onClick={userSignup}
                  >
                    Sign Up
                  </button>

                      <Link to="/doc-admin">
                      <button
                    className="block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded mt-3"
                    
                  >
                    Login Here
                  </button>
                      </Link>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
