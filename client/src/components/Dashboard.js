import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import YourRiddles from './YourRiddles';
import SolveRiddles from './SolveRiddles';
import Leaderboard from './Leaderboard';
import Logout from './Logout';
// import Footer from './Footer'; // Uncomment if you have a Footer component
import '../css/Dashboard.css';

const Dashboard = () => {
    // Use location to get the current path
    // eslint-disable-next-line no-unused-vars
    const location = useLocation();

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <Routes>
                    <Route path="/your-riddles" element={<YourRiddles />} />
                    <Route path="/solve-riddles" element={<SolveRiddles />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* Default route or redirect */}
                    <Route path="/" element={<YourRiddles />} />
                    {/* Alternatively, you can use a redirect to the default route */}
                </Routes>
            </div>
            {/* Include the Footer component if you have one */}
            {/* <Footer /> */}
        </div>
    );
};

export default Dashboard;
