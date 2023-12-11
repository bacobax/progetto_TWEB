import React, {useCallback, useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import {effect, signal} from "@preact/signals-react";

const DURATION = 2;
const x = signal(0);
const y = signal(0);
const duration = signal(DURATION);

const getRandomCoordsInScrollScreen = () => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * (window.innerHeight);

    return { x, y };
};
const VELOCITY = 100;

const setNewDestination  =() => {
    const { x: newX, y: newY } = getRandomCoordsInScrollScreen();

    const deltax = Math.abs(newX - x.value);
    const deltay = Math.abs(newY - y.value);

    const distance = Math.sqrt(deltax * deltax + deltay * deltay);


    duration.value = distance / VELOCITY;

    x.value = newX;
    y.value = newY;
    console.log('New coords:', newX, newY);
}

effect(() =>{
    setTimeout(() => {
        setNewDestination();
    }, duration.value * 1000);
})
const CircleBackground : React.FC<{className:string}>= ({className}) => {

    return (
        <motion.div
            animate={{
                x: x.value,
                y: y.value
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
