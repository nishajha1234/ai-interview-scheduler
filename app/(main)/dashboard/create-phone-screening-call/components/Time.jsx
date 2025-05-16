
import { Label } from '@/components/ui/label';
import React, { useState, useEffect, useRef } from 'react';

const TimeInputWithAMPM = ({ value, onChange }) => {
    const [time, setTime] = useState(() => {
    const [rawHours = '00', rest = '00 AM'] = value?.split(':') || [];
    const [minutes = '00', ampm = 'AM'] = rest.split(' ') || [];
    return {
        hours: rawHours.padStart(2, '0'),
        minutes: minutes.padStart(2, '0'),
        ampm,
    };
});

    // Ref to keep track of the previous value of time
    const prevTimeRef = useRef();

    useEffect(() => {
        // Only call onChange when time has changed and isn't the same as before
        const formattedTime = `${time.hours}:${time.minutes} ${time.ampm}`;
        if (prevTimeRef.current !== formattedTime) {
            onChange(formattedTime); // Notify parent with updated time
        }

        // Update the ref to the current formatted time after onChange
        prevTimeRef.current = formattedTime;
    }, [time, onChange]); // Dependency on `time` ensures it's updated when `time` changes.

    // Validate and set hours within range (1-12)
    const handleHoursChange = (e) => {
        let { value } = e.target;
        value = Math.min(Math.max(Number(value), 1), 12);  // Limit to 1-12
        setTime((prev) => ({ ...prev, hours: String(value).padStart(2, '0') })); // Ensure 2-digit format
    };

    // Validate and set minutes within range (0-59)
    const handleMinutesChange = (e) => {
        let { value } = e.target;
        value = Math.min(Math.max(Number(value), 0), 59);  // Limit to 0-59
        setTime((prev) => ({ ...prev, minutes: String(value).padStart(2, '0') })); // Ensure 2-digit format
    };

    const handleAMPMChange = (e) => {
        const { value } = e.target;
        setTime((prev) => ({ ...prev, ampm: value }));
    };

    return (
        <div>
            <Label htmlFor="date" className="text-sm font-medium mb-2">Time</Label>
        <div className="flex gap-2 items-center ">
            <input
                type="number"
                name="hours"
                value={time.hours}
                onChange={handleHoursChange}
                min="1"
                max="12"
                onInvalid={(e) => e.preventDefault()}
                className="w-12 border p-1 rounded-md"
            />
            <span>:</span>
            <input
                type="number"
                name="minutes"
                value={time.minutes}
                onChange={handleMinutesChange}
                min="0"
                max="59"
                onInvalid={(e) => e.preventDefault()}
                className="w-12 border p-1 rounded-md"
                required
            />
            <select
                name="ampm"
                value={time.ampm}
                onChange={handleAMPMChange}
                className="w-16 border p-1 rounded-md"
                required
            >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
        </div>
        </div>
    );
};

export default TimeInputWithAMPM;
