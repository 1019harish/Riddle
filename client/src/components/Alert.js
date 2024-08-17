import React, { useState, useEffect } from 'react';

const Alert = (props) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000); // Hide after 5 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <div>
            {visible && (
                <div className="alert alert-primary" role="alert">
                    {props.message}
                </div>
            )}
        </div>
    );
};

export default Alert;
