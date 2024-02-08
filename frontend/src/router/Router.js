

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Main from "../components/Main";
import Login from "../components/Login";
import AddPharmacy from "../components/AddPharmacy";
import ShowItems from "../components/ShowItems";
import Update from "../components/Update";
import UserSelection from "../components/UserSelection";
import UserForm from "../components/UserForm";
import DocAdmin from "../components/DocAdmin";
import Home from "../components/Home";
import Feedback from "../components/Feedback";
import DoctorStock from "../components/DoctorStock";
import PharmaStock from "../components/PharmaStock";
import CustomerIdeas from "../components/CustomerIdeas";
import Success from "../components/Success";

const Router = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              userRole !== null ? (
                <App />
              ) : (
                <Navigate to="/user" replace />
              )
            }
          >
            {userRole ? (
              <>
                <Route index element={<Main />} />
                <Route path="/add-pharmacy" element={<AddPharmacy />} />
                <Route path="/doctorstock" element={<DoctorStock />} />
                <Route path="/pharmastock" element={<PharmaStock />} />
                <Route path="/home" element={<Home />} />
                <Route path="/update" element={<Update />} />
                <Route path="/show-items" element={<ShowItems />} />
                <Route path="/customer-ideas" element={<CustomerIdeas />} />
              </>
            ) : null}
          </Route>
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/user" element={<UserSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/doc-admin" element={<DocAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
