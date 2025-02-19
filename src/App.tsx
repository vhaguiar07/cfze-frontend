import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/sidebar/Layout";

import Login from "./views/auth/pages/login";
import Home from "./views/home/pages/home";
import Acidente from "./views/acidente/pages/acidentes";
import Beneficio from "./views/beneficio/pages/beneficios";
import Attendance from "./views/attendance/pages/attendance";
import PPE from "./views/ppe/pages/ppe";

import { LOGIN } from "./views/auth/routes";
import { HOME } from "./views/home/routes";
import { HOME_ACIDENTE } from "./views/acidente/routes";
import { HOME_BENEFICIO } from "./views/beneficio/routes";
import { HOME_ATTENDANCE } from "./views/attendance/routes";
import { HOME_PPE } from "./views/ppe/routes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <div className="App">
        <Routes>
          <Route path={LOGIN()} element={<Login />} />
          <Route path="*" element={<Navigate to={LOGIN()} />} />

          <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path={HOME()} element={<Home />} />
              <Route path={HOME_ACIDENTE()} element={<Acidente />} />
              <Route path={HOME_BENEFICIO()} element={<Beneficio />} />
              <Route path={HOME_ATTENDANCE()} element={<Attendance />} />
              <Route path={HOME_PPE()} element={<PPE />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
