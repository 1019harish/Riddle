import React from 'react';
import '../css/Landing.css';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='landing-main'>
            <h1>Welcome to Riddle , the Game !</h1>
            <p>Hello and welcome! Please log in or register to get started.</p>
            <Link to="/login" className="landing-login-button">Login</Link>
            <Link to="/register" className="landing-register-button">Register</Link>
        </div>
    );
};

export default Landing;
