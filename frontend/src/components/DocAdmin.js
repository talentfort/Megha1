// import React, { useState } from "react";
// import Primal from "../assets/Primal.jpeg";
// import { signin } from "../api/api";
// import { useNavigate } from "react-router-dom";
// import Loader from "./Loader";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const [errorStatus, setErrorStatus] = useState("");
//   const [loading, setLoading] = useState(false);
  
//   const userLogin = async (e) => {
//     e.preventDefault(); setLoading(true);
//     try {
//       const response = await signin(email, password);

//       if (response.success && response.data.status) {
//         // Redirect upon successful sign-in
//         localStorage.setItem("userRole", response.data.role);
//         localStorage.setItem("userEmail", response.data.email);
//         setLoading(false);
//         if (response.data.role === "PharmacyUser") {
//           navigate("/update"); // Redirect to /update for PharmacyUser
//         } else {
//           navigate("/"); // Redirect to another route for other roles
//         }
//       } else {
//         // Handle error or display a message
//         setErrorStatus("Pharmacy not Approved");
//         console.log("Please login as an admin");
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//       setErrorStatus("Invalid credentials");
//       // Handle error or display a message
//     }
//   };

//   return (
//     <div>
//        {loading ?   <Loader/> : null}
//       <div className="flex flex-col flex-auto w-full h-screen">
//         <div className="h-full">
//           <div className="grid grid-cols-3 h-full">
//             <div
//               className="bg-yellow-500 bg-contain lg:flex bg-no-repeat hidden"
//               style={{ backgroundImage: `url(${Primal})` }}
//             ></div>
//             <div className="col-span-2 flex justify-center items-center">
//               <div className="min-w-[450] px-8">
//                 <div className="mb-8">
//                   <h2 className="text-3xl text-yellow-500 font-extrabold">
//                     Welcome to MeGha1
//                   </h2>
//                   <p className="text-slate-800">
//                     Please enter your credentials to Sign in
//                   </p>
//                   {errorStatus && (
//                     <div className="text-red-600">{errorStatus}</div>
//                   )}
//                 </div>
//                 <form onSubmit={userLogin}>
//                   <div className="mb-3">
//                     <label className="font-medium mb-2 flex">Email</label>
//                     <input
//                       type="text"
//                       placeholder="Enter your Email address"
//                       className="w-full border rounded-md bg-transparent border-gray-400 p-3"
//                       onChange={(e) => setEmail(e.target.value)}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="font-medium mb-2 flex">Password</label>
//                     <input
//                       type="password"
//                       placeholder="Enter your password"
//                       className="w-full border rounded-md bg-transparent border-gray-400 p-3"
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>

//                   <button
//                     className="block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded"
//                     onClick={userLogin}
//                   >
//                     Sign In
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import React, { useState } from "react";
import Primal from "../assets/Primal.jpeg";
import { signin } from "../api/api";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState("");
  const [loading, setLoading] = useState(false);
  
  const userLogin = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const response = await signin(email, password);

      if (response.success && response.data.status) {
        // Redirect upon successful sign-in
        localStorage.setItem("userRole", response.data.role);
        localStorage.setItem("userEmail", response.data.email);
        setLoading(false);
        if (response.data.role === "PharmacyUser") {
          navigate("/update"); // Redirect to /update for PharmacyUser
          window.location.reload();
        } else {
          navigate("/add-pharmacy"); // Redirect to another route for other roles
          window.location.reload();
        }
      } else {
        // Handle error or display a message
        setErrorStatus("Pharmacy not Approved");
        console.log("Please login as an admin");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setErrorStatus("Invalid credentials");
      // Handle error or display a message
    }
  };

  return (
    <div>
       {loading ?   <Loader/> : null}
      <div className="flex flex-col flex-auto w-full h-screen">
        <div className="h-full">
          <div className="grid grid-cols-3 h-full">
            <div
              className="bg-yellow-500 bg-contain lg:flex bg-no-repeat hidden"
              style={{ backgroundImage: `url(${Primal})` }}
            ></div>
            <div className="col-span-2 flex justify-center items-center">
              <div className="min-w-[450] px-8">
                <div className="mb-8">
                  <h2 className="text-3xl text-yellow-500 font-extrabold">
                    Welcome to MEGHA1
                  </h2>
                  <p className="text-slate-800">
                    Please enter your credentials to Sign in
                  </p>
                  {errorStatus && (
                    <div className="text-red-600">{errorStatus}</div>
                  )}
                </div>
                <form onSubmit={userLogin}>
                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">Email</label>
                    <input
                      type="text"
                      placeholder="Enter your Email address"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="font-medium mb-2 flex">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full border rounded-md bg-transparent border-gray-400 p-3"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    className="block bg-green-700 hover:bg-yellow-500 text-white w-full py-2 px-8 rounded"
                    onClick={userLogin}
                  >
                    Login
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

export default Login;
