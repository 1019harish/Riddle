import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../css/Footer.css'
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white text-center py-3 mt-5">
            <div className="container">
                <p className="mb-0">&copy; {year} Riddle, The Game! All rights reserved.</p>
                <div className="mt-2">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="fab fa-facebook-f fa-lg"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="fab fa-twitter fa-lg"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="fab fa-linkedin-in fa-lg"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
                        <i className="fab fa-instagram fa-lg"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
