import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const DURATION = 2;
const VELOCITY = 100;

const getRandomCoordsInScrollScreen = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    return { x, y };
};

const CircleBackground: React.FC<{ className: string }> = ({ className }) => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [duration, setDuration] = useState(DURATION);

    const setNewDestination = useCallback(() => {
        const { x: newX, y: newY } = getRandomCoordsInScrollScreen();
        const deltaX = Math.abs(newX - coords.x);
        const deltaY = Math.abs(newY - coords.y);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        setDuration(distance / VELOCITY);
        setCoords({ x: newX, y: newY });
    }, [coords.x, coords.y]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setNewDestination();
        }, duration * 1000);

        return () => clearTimeout(timeoutId); // Cleanup timeout
    }, [setNewDestination, duration]);

    return (
        <motion.div
            animate={{
                x: coords.x,
                y: coords.y,
            }}
            transition={{
                duration: duration,
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                height: '300px',
                borderRadius: '50%',
            }}
            className={className}
        />
    );
};

export default CircleBackground;
