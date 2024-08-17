

import React, { useState, useEffect } from 'react';
import '../css/Leaderboard.css'; // Import your CSS file for styling

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/user/leaderboard'); // Adjust the URL as needed
                const data = await response.json();
                if (response.ok) {
                    setLeaderboard(data);
                
                } else {
                    setError('Failed to fetch leaderboard data');
                }
            } catch (error) {
                setError('An error occurred while fetching leaderboard data');
                console.error('Error fetching leaderboard data:', error);
            }
        };
        fetchLeaderboard();
    }, []);

    return (
        <div className="container my-3">
            <h1>Leaderboard</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Points</th>
                        <th>Riddles Solved</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((user) => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                            <td>{user.riddlesSolved !== undefined ? user.riddlesSolved : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
