// import React, { useEffect, useState } from "react";
// import Image from "../images/image.png";
// import Logo from "../images/logo.png";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "../css/Register.css";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const Register = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [passwordsMatch, setPasswordsMatch] = useState(true);
//     const navigate = useNavigate();

//     const handleRegisterSubmit = async (e) => {
//         e.preventDefault();
//         const username = e.target.username.value;
//         const email = e.target.email.value;
//         const password = e.target.password.value;
//         const confirmPassword = e.target.confirmPassword.value;

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             setPasswordsMatch(false);
//             return;
//         }

//         setPasswordsMatch(true);

//         if (username && email && password) {
//             const formData = {
//                 username,
//                 email,
//                 password,
//             };

//             try {
//                 const response = await fetch("http://localhost:9000/api/user/createuser", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                     body: JSON.stringify(formData),
//                 });

//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || "Registration failed");
//                 }

//                 toast.success("Registration successful");
//                 navigate("/login"); // Redirect to login after successful registration
//             } catch (err) {
//                 toast.error(err.message);
//             }
//         } else {
//             toast.error("Please fill all inputs");
//         }
//     };

//     useEffect(() => {
//         // Ensure that no token is present in localStorage
//         localStorage.removeItem("auth");
//     }, []);

//     return (
//         <div className="register-main">
//             <div className="register-left">
//                 <img src={Image} alt="Background" />
//             </div>
//             <div className="register-right">
//                 <div className="register-right-container">
//                     <div className="register-logo">
//                         <img src={Logo} alt="Logo" />
//                     </div>
//                     <div className="register-center">
//                         <h2>Welcome to our website!</h2>
//                         <p>Please enter your details</p>
//                         <form onSubmit={handleRegisterSubmit}>
//                             <input type="text" placeholder="Username" name="username" required />
//                             <input type="email" placeholder="Email" name="email" required />
//                             <div className="pass-input-div">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Password"
//                                     name="password"
//                                     required
//                                 />
//                                 {showPassword ? (
//                                     <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
//                                 ) : (
//                                     <FaEye onClick={() => setShowPassword(!showPassword)} />
//                                 )}
//                             </div>
//                             <div className="pass-input-div">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     placeholder="Confirm Password"
//                                     name="confirmPassword"
//                                     required
//                                 />
//                                 {showPassword ? (
//                                     <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
//                                 ) : (
//                                     <FaEye onClick={() => setShowPassword(!showPassword)} />
//                                 )}
//                             </div>
//                             {!passwordsMatch && (
//                                 <p className="error-message">Passwords do not match</p>
//                             )}
                            
//                         </form>
//                     </div>
//                     <p className="login-bottom-p">
//                         Already have an account? <Link to="/login">Login</Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register
import React, { useEffect, useState } from "react";
import Image from "../images/image.png";
import Logo from "../images/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordsMatch(false);
            return;
        }

        setPasswordsMatch(true);

        if (username && email && password) {
            const formData = {
                username,
                email,
                password,
            };

            try {
                console.log("Sending request with data:", formData); // Log the request payload for debugging
                const response = await fetch("http://localhost:9000/api/user/createuser", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Error response data:", errorData); // Log the error response for debugging
                    throw new Error(errorData.message || "Registration failed");
                }

                toast.success("Registration successful");
                navigate("/login"); // Redirect to login after successful registration
            } catch (err) {
                console.error("Error during registration:", err); // Log the error for debugging
                toast.error(err.message);
            }
        } else {
            toast.error("Please fill all inputs");
        }
    };

    useEffect(() => {
        // Ensure that no token is present in localStorage
        localStorage.removeItem("auth");
    }, []);

    return (
        <div className="register-main">
            <div className="register-left">
                <img src={Image} alt="Background" />
            </div>
            <div className="register-right">
                <div className="register-right-container">
                    <div className="register-logo">
                        <img src={Logo} alt="Logo" />
                    </div>
                    <div className="register-center">
                        <h2>Welcome to our website!</h2>
                        <p>Please enter your details</p>
                        <form onSubmit={handleRegisterSubmit}>
                            <input type="text" placeholder="Username" name="username" required />
                            <input type="email" placeholder="Email" name="email" required />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    required
                                />
                                {showPassword ? (
                                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                                )}
                            </div>
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    required
                                />
                                {showPassword ? (
                                    <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                                ) : (
                                    <FaEye onClick={() => setShowPassword(!showPassword)} />
                                )}
                            </div>
                            {!passwordsMatch && (
                                <p className="error-message">Passwords do not match</p>
                            )}
                            <button type="submit">
                                Register
                            </button>
                        </form>
                    </div>
                    <p className="login-bottom-p">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
