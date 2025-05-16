import React, { useEffect, useState } from 'react'

function TimerComponent({ start }) {
    const [time, setTime] = useState(0);
    
    useEffect(() => {
        let interval;

        if (start) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [start]);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    return (
        <div>{formatTime(time)}</div>
    );
}

export default TimerComponent;
