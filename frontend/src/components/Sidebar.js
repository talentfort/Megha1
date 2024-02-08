// import React from "react";
// import { FaTachometerAlt } from "react-icons/fa";
// import { BsGraphUpArrow } from "react-icons/bs";
// import { AiFillHome } from "react-icons/ai";
// import { BsHouseAddFill } from "react-icons/bs";
// import { MdUpdate } from "react-icons/md";
// import Logo from "../assets/Logo.png";
// import { FaUserAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { signout } from "../api/api";
// import { useNavigate } from "react-router-dom";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem("userRole");

//   const handleLogout = () => {
//     // Call the signout function here
//     signout()
//       .then((response) => {
//         // Handle any success logic here
//         console.log("Logged out successfully", response);
//         navigate("/user");
//         localStorage.clear();

//         // Perform any additional tasks such as redirecting the user, updating state, etc.
//       })
//       .catch((error) => {
//         // Handle any error logic here
//         console.error("Error logging out", error);
//       });
//   };
//   return (
//     <div className="bg-green-700 px-[25px] h-screen">
//       <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
//         <h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
//           <span>
//             <img src={Logo} alt="logo"></img>
//           </span>
//           Admin Panel
//         </h1>
//       </div>
//       {userRole !== "PharmacyUser" && (
//         <Link to="/">
//           <div className="flex items-center gap-[10px] py-[10px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-500">
//             <FaTachometerAlt color="white" />
//             <p className="text-[14px] leading-[20px] font-bold text-white">
//               Dashboard
//             </p>
//           </div>
//         </Link>
//       )}
//       <div className="pt-[5px] border-b-[1px] border-[#EDEDED]/[0.3] text-xl">
//         {userRole !== "PharmacyUser" && (
//           <Link to="/home">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <AiFillHome color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Home
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}
//         {userRole !== "PharmacyUser" && (
//           <Link to="/add-pharmacy">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <BsHouseAddFill color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Add Pharmacy
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}
//         {userRole !== "PharmacyUser" && (
//           <Link to="/doctorstock">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <BsHouseAddFill color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Doctor Stock
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}
//         {userRole !== "Doctor" && (
//           <Link to="/update">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <MdUpdate color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Update Stock
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}
//         {userRole !== "Doctor" && (
//           <Link to="/pharmastock">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <MdUpdate color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Pharmacy Update Sales
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}

//         {userRole !== "PharmacyUser" && (
//           <Link to="/show-items">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300 ">
//               <div className="flex items-center gap-[10px]">
//                 <BsGraphUpArrow color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Show Items
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}

//         {/* comment section */}

//         {userRole !== "PharmacyUser" && (
//           <Link to="/customer-ideas">
//             <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
//               <div className="flex items-center gap-[10px]">
//                 <MdUpdate color="white" />{" "}
//                 <p className="text-[14px] leading-[20px] font-normal text-white">
//                   Customer Ideas
//                 </p>
//               </div>
//             </div>
//           </Link>
//         )}

//         <div
//           className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300"
//           onClick={handleLogout}
//         >
//           <div className="flex items-center gap-[10px]">
//             <FaUserAlt color="white" />{" "}
//             <p className="text-[14px] leading-[20px] font-normal text-white">
//               Log Out
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="pt-[15px]">
//         <div className="flex items-center justify-center"></div>
//       </div>
//       <div className="bg-[#1E4A01] mt-[10px] flex items-center justify-center flex-col py-[5px] px-[10px] gap-[15px] rounded-[20px]">
//         <img src={Logo} alt="logo" />
//         <p className="text-[12px] leading-[18px] font-normal text-white/[0.7] text-center">
//           We are always committed to provide the best in quality of our products
          
//         </p>

//         <a href="https://megha1.com" className="block" target="_blank">
//           <button className="bg-yellow-500 text-white flex items-center justify-center h-[30px] w-[90px] rounded-[3px] text-[14px] leading-[21px] font-normal">
//             Visit Our
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { BsHouseAddFill } from "react-icons/bs";
import { MdUpdate } from "react-icons/md";
import Logo from "../assets/Logo.png";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signout } from "../api/api";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    // Call the signout function here
    signout()
      .then((response) => {
        // Handle any success logic here
        console.log("Logged out successfully", response);
        navigate("/user");
        localStorage.clear();

        // Perform any additional tasks such as redirecting the user, updating state, etc.
      })
      .catch((error) => {
        // Handle any error logic here
        console.error("Error logging out", error);
      });
  };

  return (
    <div className="bg-green-700 w-24 md:w-64 h-screen md:space-y-4 space-y-2">
      <div className="px-2 md:px-5 py-3 md:py-6 flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-lg md:text-2xl leading-6 md:leading-8 font-extrabold cursor-pointer">
          <span>
            <img src={Logo} alt="logo" />
          </span>
          Admin Panel
        </h1>
      </div>
      {userRole !== "PharmacyUser" && (
        <Link to="/">
          <div className="flex items-center gap-2 md:gap-4 ml-2 py-2 md:py-4 border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer hover-bg-yellow-500 rounded-xl duration-500">
            <FaTachometerAlt color="white" />
            <p className="text-xs md:text-base font-bold text-white">
              Dashboard
            </p>
          </div>
        </Link>
      )}
      {/* ... (the rest of the links and content) */}

      <div className="pt-[5px] border-b-[1px] ml-2 border-[#EDEDED]/[0.3] text-xl">
        {userRole !== "PharmacyUser" && (
          <Link to="/home">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <AiFillHome color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Home
                </p>
              </div>
            </div>
          </Link>
        )}
        {userRole !== "PharmacyUser" && (
          <Link to="/add-pharmacy">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <BsHouseAddFill color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Add Pharmacy
                </p>
              </div>
            </div>
          </Link>
        )}
        {userRole !== "PharmacyUser" && (
          <Link to="/doctorstock">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <BsHouseAddFill color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Doctor Stock
                </p>
              </div>
            </div>
          </Link>
        )}
        {userRole !== "Doctor" && (
          <Link to="/update">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <MdUpdate color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Update Stock
                </p>
              </div>
            </div>
          </Link>
        )}
        {userRole !== "Doctor" && (
          <Link to="/pharmastock">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <MdUpdate color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Pharmacy Update Sales
                </p>
              </div>
            </div>
          </Link>
        )}

        {userRole !== "PharmacyUser" && (
          <Link to="/show-items">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300 ">
              <div className="flex items-center gap-[10px]">
                <BsGraphUpArrow color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Show Items
                </p>
              </div>
            </div>
          </Link>
        )}

        {/* comment section */}

        {userRole !== "PharmacyUser" && (
          <Link to="/customer-ideas">
            <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300">
              <div className="flex items-center gap-[10px]">
                <MdUpdate color="white" />{" "}
                <p className="text-[14px] leading-[20px] font-normal text-white">
                  Customer Ideas
                </p>
              </div>
            </div>
          </Link>
        )}

        <div
          className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer  hover:bg-yellow-500 rounded-xl duration-300"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-[10px]">
            <FaUserAlt color="white" />{" "}
            <p className="text-[14px] leading-[20px] font-normal text-white">
              Log Out
            </p>
          </div>
        </div>
      </div>

      <div className="pt-[15px]">
        <div className="flex items-center justify-center"></div>
      </div>
      <div className="bg-[#1E4A01] mt-[10px] flex items-center justify-center flex-col py-[5px] px-[10px] gap-[15px] rounded-bt-[20px]">
        <img src={Logo} alt="logo" />
        <p className="text-[12px] leading-[18px] font-normal text-white/[0.7] text-center">
          We are always committed to provide the best in quality of our products
          
        </p>

        <a href="https://megha1.com" className="block" target="_blank">
          <button className="bg-yellow-500 text-white flex items-center justify-center h-[30px] w-[90px] rounded-[3px] text-[14px] leading-[21px] font-normal">
            Visit Our
          </button>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
