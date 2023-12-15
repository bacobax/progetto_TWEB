import { useState, useEffect } from 'react';
import {WINDOWPHONESIZE} from "../constants/constants";

// Helper function to debounce another function
const debounce = (func: ()=>void, delay:number) => {
    let timer: string | number | NodeJS.Timeout | undefined;
    return ()=> {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func();
        }, delay);
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const isPhone = windowSize.width < WINDOWPHONESIZE;

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = debounce(() => {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 100); // 100ms debounce

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount and unmount

    return {...windowSize, isPhone};
};

export default useWindowSize;
