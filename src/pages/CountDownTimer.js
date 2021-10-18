import React, {useState, useEffect} from 'react'
import '../scss/countdowntimer.scss';

const CountDownTimer = () => {

    const [seconds, setSeconds] = useState(0)
    const [minuets, setMinuets] = useState(0)
    const [hours, setHours] = useState(0)
    const [days, setDays] = useState(0)
    
    useEffect(() => {
        setInterval(() => {calculateTime()}, 1000);
    }, [])

    function calculateTime() {
        const currentDate = new Date();
        const nextYear = new Date().getFullYear();
        const nextNewYears = new Date(nextYear, 11, 31, 24);
        const totalSeconds = (nextNewYears - currentDate) / 1000;
        
        setDays(Math.floor(totalSeconds / 3600 / 24));
        setHours(Math.floor(totalSeconds / 3600) % 24);
        setMinuets(Math.floor(totalSeconds / 60) % 60);
        setSeconds(Math.floor(totalSeconds) % 60);
    }

    return (
       <div className="countdown-container ">
           <h1 className="new-years">New Years Eve</h1>
           <div className="clock">
                <div className="days">
                    <h1>{days.toFixed()}</h1>
                    <p>days</p>
                </div>
                <div className="hours">
                    <h1>{hours.toFixed()}</h1>
                    <p>hours</p>
                </div>
                <div className="minuets">
                    <h1>{minuets.toFixed()}</h1>
                    <p>minuets</p>
                </div>
                <div className="seconds">
                    <h1>{seconds.toFixed()}</h1>
                    <p>seconds</p>
                </div>
           </div>
       </div>
    )
}

export default CountDownTimer;