import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the local storage
        localStorage.removeItem('token');

        // Redirect to the home page
        navigate('/');
    }, [navigate]);

    return null; // No UI is needed for this component
};

export default Logout;
