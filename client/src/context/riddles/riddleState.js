import React, { useState } from 'react';
import RiddleContext from './riddleContext';

const RiddleState = (props) => {
    const host = "http://localhost:9000";
    const [riddles, setRiddles] = useState([]);

    const getAuthToken = () => localStorage.getItem('token');

    // Fetch riddles added by the logged-in user
    const fetchRiddle = async () => {
        try {
            const response = await fetch(`${host}/api/dashboard/fetchriddle`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken()
                },
            });
            const json = await response.json();
            setRiddles(json);
        } catch (error) {
            console.error('Error fetching riddles:', error);
        }
    };

    // Fetch riddles excluding those added by the logged-in user
    const fetchOtherRiddles = async () => {
        try {
            const response = await fetch(`${host}/api/dashboard/fetchother`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken()
                }
            });
            const data = await response.json();
            setRiddles(data);
        } catch (error) {
            console.error('Error fetching riddles:', error);
        }
    };

    // Add riddle
    const addRiddle = async ({ question, answer, hashType }) => {
        const riddle = { question, answer, hashType };
        try {
            const response = await fetch(`${host}/api/dashboard/addriddle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken()
                },
                body: JSON.stringify(riddle)
            });

            if (!response.ok) {
                throw new Error('Failed to add riddle');
            }

            const json = await response.json();
            setRiddles(prevRiddles => [...prevRiddles, json]);
        } catch (error) {
            console.error('Error adding riddle:', error.message);
        }
    };

    // Delete riddle
    const deleteRiddle = async (id) => {
        try {
            const response = await fetch(`${host}/api/dashboard/deleteriddle/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken()
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete riddle');
            }
            
            const json = await response.json();
            
            const newRiddles = riddles.filter(riddle => riddle._id !== id);
            setRiddles(newRiddles);
        } catch (error) {
            console.error('Error deleting riddle:', error);
        }
    };

    // Edit riddle
    const editRiddle = async ({ _id, question, answer, hashType }) => {
        const updatedRiddle = { question, answer, hashType };
    
    
        try {
            const response = await fetch(`${host}/api/dashboard/editriddle/${_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': getAuthToken()
                },
                body: JSON.stringify(updatedRiddle)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorData.message || 'Unknown error'}`);
            }
    
            const json = await response.json();
            
            // Update the riddles state
            const updatedRiddles = riddles.map(riddle =>
                riddle._id === _id ? { ...riddle, question, answer, hashType } : riddle
            );
            setRiddles(updatedRiddles);
    
        } catch (error) {
            console.error('Error updating riddle:', error.message);
        }
    };

    return (
        <RiddleContext.Provider value={{ riddles, setRiddles, addRiddle, deleteRiddle, editRiddle, fetchRiddle, fetchOtherRiddles }}>
            {props.children}
        </RiddleContext.Provider>
    );
};

export default RiddleState;

