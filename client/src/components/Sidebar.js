    import React from 'react';
    import { Link } from 'react-router-dom';
    import '../css/Sidebar.css'; // Import your CSS file for styling

    const Sidebar = () => {
    return (
        <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
            <li><Link to="/dashboard/your-riddles">Your Riddles</Link></li>
            <li><Link to="/dashboard/solve-riddles">Solve Riddles</Link></li>
            <li><Link to="/dashboard/leaderboard">leaderboard</Link></li>
            <li><Link to="/dashboard/logout">Logout</Link></li>
        </ul>
        </div>
    );
    };

    export default Sidebar;
