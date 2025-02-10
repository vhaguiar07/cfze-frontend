import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Login from './views/auth/pages/login';
import Home from './views/home/pages/home';
import EmployeePage from './views/employee/pages/employee';
import { LOGIN } from './views/auth/routes';
import { HOME } from './views/home/routes';
import { EMPLOYEE } from './views/employee/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={LOGIN()} element={<Login />} />
          <Route path="*" element={<Navigate to={LOGIN()} />} />
          <Route element={<PrivateRoute />}>
            <Route path={HOME()} element={<Home />} />
            <Route path={EMPLOYEE()} element={<EmployeePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
