import {useCallback, useEffect, useState} from "react";
import {WINDOWPHONESIZE} from "../constants/constants";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const isPhone = windowSize.width < WINDOWPHONESIZE;
    const handleResize =useCallback (() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    useEffect(() => {

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [ handleResize]);

    return {...windowSize, isPhone};
}

export default useWindowSize;