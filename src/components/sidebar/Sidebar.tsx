import React from "react";
import { Link } from "react-router-dom";

import { HOME } from "../../views/home/routes";
import { HOME_ACIDENTE } from "../../views/acidente/routes";
import { HOME_BENEFICIO } from "../../views/beneficio/routes";
import { HOME_ATTENDANCE } from "../../views/attendance/routes";
import { HOME_PPE } from "../../views/ppe/routes";

import "./css/Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="font-bold">Minha Aplicação</h2>
      <nav>
        <Link to={HOME()}>Home</Link>
        <Link to={HOME_ACIDENTE()}>Acidente</Link>
        <Link to={HOME_BENEFICIO()}>Benefício</Link>
        <Link to={HOME_ATTENDANCE()}>Frequência</Link>
        <Link to={HOME_PPE()}>EPI</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
