import React, {useCallback, useEffect, useState} from 'react';
import { motion } from 'framer-motion';

const getRandomCoordsInScrollScreen = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight);

    return { x, y };
};

const DURATION = 2;
const VELOCITY = 100;

const CircleBackground : React.FC<{className:string}>= ({className}) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [duration, setDuration] = useState(DURATION);

    const setNewDestination  =useCallback (() => {
        const { x: newX, y: newY } = getRandomCoordsInScrollScreen();

        const deltax = Math.abs(newX - x);
        const deltay = Math.abs(newY - y);

        const distance = Math.sqrt(deltax * deltax + deltay * deltay);

        const newDuration = distance / VELOCITY;

        setDuration(newDuration);

        setX(newX);
        setY(newY);
        console.log('New coords:', newX, newY);
    }, [x, y]);

    useEffect(() => {
        const interval = setInterval(() => {
            setNewDestination();
        }, duration * 1000);

        return () => clearInterval(interval);
    }, [setNewDestination, duration]);

    return (
        <motion.div
            animate={{
                x,
                y
            }}
            transition={{
                duration: duration,
            }}
            style={{
                top: 0,
                left: 0,
                width: '300px',
                height: '300px',
                //football ball style with green linear gradient background
                borderRadius: '50%'
            }}
            className={className}

        />
    );
};

export default CircleBackground;
