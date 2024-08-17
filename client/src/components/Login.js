import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import '../css/Login.css'; // Import your CSS file
import loginImage from '../images/image.png';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9000/api/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
    
            const json = await response.json();
    
            if (response.ok) {
                if (json.token) {
                    localStorage.setItem('token', json.token);
                    navigate("/dashboard");
                } else {
                    alert('Login failed: Invalid credentials');
                }
            } else {
                alert(`Login failed: ${JSON.stringify(json.error) || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in');
        }
    };
    
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <section className="login-section vh-100">
            <div className="container container-green-bg">
                <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 d-none d-md-block">
                        <img
                            src={loginImage} // Replace with your image path
                            alt="Login"
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-5 wider-form wider-form-xl"> {/* Added classes for larger screens */}
                        <div className="card p-4 p-lg-5 text-black">
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex align-items-center mb-3 pb-1">
                                        <span className="h1 fw-bold mb-0">Riddle</span>
                                    </div>
                                    <h5 className="fw-normal mb-3 pb-3">
                                        Sign into your account
                                    </h5>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control form-control-lg"
                                            value={credentials.email}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control form-control-lg"
                                            value={credentials.password}
                                            onChange={onChange}
                                            required
                                        />
                                        <label className="form-label" htmlFor="password">Password</label>
                                    </div>
                                    <div className="pt-1 mb-4">
                                        <button type="submit" className="btn btn-dark btn-lg btn-block">Login</button>
                                    </div>
                                    <p className="mb-5 pb-lg-2">
                                        Don't have an account? <Link to="/register" className="text-primary">Register here</Link>
                                    </p>
                                    <a href="#!" className="small text-muted d-block">Terms of use.</a>
                                    <a href="#!" className="small text-muted d-block">Privacy policy</a>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
