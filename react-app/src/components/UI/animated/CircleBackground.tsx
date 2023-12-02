import React, {useCallback, useEffect, useState} from 'react';
import { motion } from 'framer-motion';

const getRandomCoordsInScrollScreen = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight * 3);

    return { x, y };
};

const DURATION = 2;
const VELOCITY = 100;

const CircleBackground = () => {
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
                position: 'absolute',
                top: 0,
                left: 0,
                width: '300px',
                height: '300px',
                //football ball style with green linear gradient background
                background: 'linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(0,128,0,1) 50%, rgba(0,255,0,1) 100%)',
                zIndex: -1,
                opacity: 0.5,
                borderRadius: '50%'
            }}

        />
    );
};

export default CircleBackground;
