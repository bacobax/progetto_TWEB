import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const CircleBackground = () => {

    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

    useEffect(() => {
        const interval = setInterval(() => {
            set({
                x: Math.random() * (window.innerWidth - 100),
                y: Math.random() * (window.innerHeight - 100),
                config: { tension: 180, friction: 12 },
                reset: true,
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [set]);

    return (
        <animated.div
            style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: 'blue',
                position: 'absolute',
                willChange: 'transform',
                transform: x.to(x => `translate3d(${x}px, ${y.to(y => y)}px, 0)`)
            }}
        />
    );
};

export default CircleBackground;
