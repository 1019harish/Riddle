    import React, { useState, useContext } from "react";
    import riddleContext from "../context/riddles/riddleContext";
    import "../css/AddRiddle.css";

    const AddRiddle = () => {
    const context = useContext(riddleContext);
    const { addRiddle } = context;

    const [riddle, setRiddle] = useState({
        question: "",
        answer: "",
        hashType: "", // Default value for hash type
    });

    const handleClick = (e) => {
        e.preventDefault(); // Prevent form submission
        if (riddle.question && riddle.answer && riddle.hashType) {
        addRiddle(riddle);
        setRiddle({ question: "", answer: "", hashType: "" }); // Reset after adding
        } else {
        alert("Please fill out all fields");
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setRiddle((prevState) => ({
        ...prevState,
        [name]: value,
        }));
        
    };

    return (
        <div>
        <h1 className="text-center">Add a Riddle</h1>
        <form>
            <div className="mb-3">
            <label htmlFor="question" className="form-label">
                Question
            </label>
            <input
                type="text"
                className="form-control"
                id="question"
                name="question"
                value={riddle.question}
                onChange={onChange}
                required
            />
            </div>
            <div className="mb-3">
            <label htmlFor="answer" className="form-label">
                Answer
            </label>
            <input
                type="text"
                className="form-control"
                id="answer"
                name="answer"
                value={riddle.answer}
                onChange={onChange}
                required
            />
            </div>
            <div className="mb-3">
            <label className="form-label">Hash Type</label>
            <div>
                <div className="form-check">
                <input
                    type="radio"
                    id="sha256"
                    name="hashType"
                    value="sha-256"
                    checked={riddle.hashType === "sha-256"}
                    onChange={onChange}
                    className="form-check-input"
                />
                <label htmlFor="sha256" className="form-check-label">
                    SHA-256
                </label>
                </div>
                <div className="form-check">
                <input
                    type="radio"
                    id="sha1"
                    name="hashType"
                    value="sha-1"
                    checked={riddle.hashType === "sha-1"}
                    onChange={onChange}
                    className="form-check-input"
                />
                <label htmlFor="sha1" className="form-check-label">
                    SHA-1
                </label>
                </div>
            </div>
            <div className="mt-3">
                <p>
                Selected Hash Type: <strong>{riddle.hashType}</strong>
                </p>
            </div>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Riddle
            </button>
        </form>
        </div>
    );
    };

    export default AddRiddle;
