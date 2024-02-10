import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SchedulePage from './pages/schedule/SchedulePage';
import GameDetail from './pages/gamedetails/gameDetails';
import NavBar from './components/NavBar'
import DashboardPage from './pages/dashboard/Dashboard';
import './tailwind.css'; 


function App() {
  return (
    <Router>
      <NavBar/>
      <div className=" bg-gray-100 h-[92dvh] ">
      <Routes>
        <Route path ="/" element={<DashboardPage/>}/>
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/game-details" element={<GameDetail />} /> 
      </Routes>
      </div>
    </Router>
  );
}

export default App;