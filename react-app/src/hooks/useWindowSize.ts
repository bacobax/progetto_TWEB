import {useEffect, useState} from "react";
import {WINDOWPHONESIZE} from "../constants/windowSize";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const isPhone = windowSize.width < WINDOWPHONESIZE;


    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {...windowSize, isPhone};
}

export default useWindowSize;