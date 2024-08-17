import React, { useContext, useEffect } from 'react';
import riddleContext from '../context/riddles/riddleContext';
import RiddleItem from '../components/RiddleItem';
import AddRiddle from '../components/AddRiddle'

const Riddle = () => {
    const context = useContext(riddleContext);
    const { riddles, fetchRiddle } = context;
    useEffect(() => {
        fetchRiddle()
        // eslint-disable-next-line
    }, [])
    

    return (
        <div >
            <AddRiddle/>

            <div className="row my-3">
                <h2>Your Riddles</h2>
                <div className="container mx-2">
                    {riddles.length === 0 && 'No riddles to display'}
                </div>
                {riddles.map((riddle) => (
                    <RiddleItem key={riddle._id} riddle={riddle} />
                ))}
            </div>
        </div>
    );
};

export default Riddle;

