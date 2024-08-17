

import React, { useState, useEffect, useContext } from 'react';
import RiddleContext from '../context/riddles/riddleContext';
import '../css/SolveRiddle.css'; // Import the external CSS file

const SolveRiddles = () => {
    const { riddles, fetchOtherRiddles } = useContext(RiddleContext);

    const [showModal, setShowModal] = useState(false);
    const [selectedRiddleId, setSelectedRiddleId] = useState(null);
    const [answer, setAnswer] = useState('');
    const [hashType, setHashType] = useState('sha-1');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [answerStatus, setAnswerStatus] = useState(null); // New state for answer status
    const [timerId, setTimerId] = useState(null);
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        fetchOtherRiddles();
        fetchUserPoints();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchUserPoints = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('No token found. Please log in.');
            return;
        }

        try {
            const response = await fetch("http://localhost:9000/api/user/getuserpoints", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });

            const json = await response.json();
            if (response.ok) {
                setUserPoints(json.points);
            } else {
                setErrorMessage(json.error || 'An error occurred');
            }
        } catch (error) {
            console.error('Error fetching user points:', error);
            setErrorMessage('An error occurred while fetching user points');
        }
    };

    const handleSolveClick = (riddleId) => {
        setSelectedRiddleId(riddleId);
        setShowModal(true);
        setSuccessMessage('');
        setErrorMessage('');
        setAnswerStatus(null); // Reset answer status
    };

    const handleClose = () => {
        setShowModal(false);
        setErrorMessage('');
        setSuccessMessage('');
        setAnswerStatus(null); // Reset answer status
        if (timerId) {
            clearTimeout(timerId);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setErrorMessage('No token found. Please log in.');
            return;
        }

        const solution = {
            riddleId: selectedRiddleId,
            answer,
            hashType: hashType.toLowerCase(),
        };

        try {
            const response = await fetch("http://localhost:9000/api/dashboard/solveriddle", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
                body: JSON.stringify(solution)
            });

            const json = await response.json();
            if (response.ok) {
                setSuccessMessage(`Riddle solved! 1 point added. Your total points: ${json.points}`);
                setUserPoints(json.points);
                setAnswerStatus('correct'); // Set answer status to correct

                // Update riddle's solved status
                fetchOtherRiddles();

                const id = setTimeout(() => {
                    handleClose();
                }, 5000);
                setTimerId(id);
            } else {
                setErrorMessage(json.error || 'An error occurred');
                setSuccessMessage('');
                setAnswerStatus('incorrect'); // Set answer status to incorrect
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error solving riddle:', error);
            setErrorMessage('An error occurred while solving the riddle');
            setSuccessMessage('');
            setAnswerStatus('incorrect'); // Set answer status to incorrect
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

    return (
        <div className="container my-3">
            <div className="header-container">
                <h2 className="header-title">Riddles to Solve</h2>
                <div className="points-badge">
                    <span>Total Reward Points: {userPoints}</span>
                </div>
            </div>

            <div className="row">
                {!Array.isArray(riddles) || riddles.length === 0 ? (
                    <p>No riddles to display</p>
                ) : (
                    riddles.map(riddle => (
                        <div className={`col-md-3 mb-3 ${riddle.solved ? '' : 'riddle-card'}`} key={riddle._id}>
                            <div className={`card ${riddle.error ? 'error-card' : ''}`}>
                                <div className="card-body">
                                    <h5 className="card-title">{riddle.question}</h5>
                                    {!riddle.solved && (
                                        <button className="btn btn-primary" onClick={() => handleSolveClick(riddle._id)}>
                                            Solve Riddle
                                        </button>
                                    )}
                                    {riddle.solved && (
                                        <p className="text-success">Riddle Solved</p>
                                    )}
                                    {riddle.error && (
                                        <div className="error-message">
                                            <p>{riddle.errorMessage || 'Error solving riddle'}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showModal && (
                <div className="modal show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Solve Riddle</h5>
                                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                                {answerStatus === 'incorrect' && <div className="alert alert-danger">Wrong Answer</div>}
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="answer">Your Answer</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="answer"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="hashType">Hash Type</label>
                                        <select
                                            id="hashType"
                                            className="form-control"
                                            value={hashType}
                                            onChange={(e) => setHashType(e.target.value)}
                                        >
                                            <option value="sha-1">SHA-1</option>
                                            <option value="sha-256">SHA-256</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SolveRiddles;
