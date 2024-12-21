import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPage from './components/CalendarPage';
import JournalPage from './components/JournalPage';
import Dashboard from './components/Dashboard';
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/journal" element={<JournalPage />} />
      </Routes>
    </Router>
  );
}

export default App;