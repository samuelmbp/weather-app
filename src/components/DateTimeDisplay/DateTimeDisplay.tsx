import { useEffect, useState } from "react";
import "./DateTimeDisplay.scss";

const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // second: "2-digit",
        };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="date-time-display">
            <p className="date-time-display__text">
                {formatDate(currentDateTime)}
            </p>
        </div>
    );
};

export default DateTimeDisplay;
