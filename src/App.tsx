import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';

import Login from './views/auth/pages/login';
import Home from './views/home/pages/home';
import HomeAcidente from './views/acidente/pages/home-acidente';
import CadastroAcidente from './views/acidente/pages/cadastro-acidente';
import CadastroCustoAcidente from './views/acidente/pages/cadastro-custo-acidente';
import Acidente from './views/acidente/pages/acidentes';

import { LOGIN } from './views/auth/routes';
import { HOME } from './views/home/routes';
import { HOME_ACIDENTE } from './views/acidente/routes';
import { CADASTRO_ACIDENTE } from './views/acidente/routes';
import { CADASTRO_CUSTO_ACIDENTE } from './views/acidente/routes';
import { ACIDENTE } from './views/acidente/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={LOGIN()} element={<Login />} />
          <Route path="*" element={<Navigate to={LOGIN()} />} />
          <Route element={<PrivateRoute />}>
            <Route path={HOME()} element={<Home />} />
            <Route path={HOME_ACIDENTE()} element={<HomeAcidente />} />
            <Route path={CADASTRO_ACIDENTE()} element={<CadastroAcidente />} />
            <Route path={CADASTRO_CUSTO_ACIDENTE()} element={<CadastroCustoAcidente />} />
            <Route path={ACIDENTE()} element={<Acidente />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
