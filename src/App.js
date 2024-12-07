import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Avatar from './components/Avatar'; // Import Avatar component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/avatar" element={<Avatar />} />
      </Routes>
    </Router>
  );
}

export default App;
