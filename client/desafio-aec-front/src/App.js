import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
export const API_URL = 'http://localhost:3000';
function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
