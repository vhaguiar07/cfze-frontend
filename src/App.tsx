import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/auth/pages/login';
import { LOGIN } from './views/auth/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path={LOGIN()} element={<Login />} />
          <Route path="*" element={<Navigate to={LOGIN()} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
