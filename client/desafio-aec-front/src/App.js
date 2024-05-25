import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import Home from './pages/Home';
export const API_URL = 'http://localhost:3001';
function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
