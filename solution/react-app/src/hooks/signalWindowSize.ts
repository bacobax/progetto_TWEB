import {computed, effect, signal} from "@preact/signals-react";
import {WINDOWPHONESIZE} from "../constants/constants";


const signalWindowSize = signal<{width: number, height: number, isPhone: boolean}>({width: window.innerWidth, height: window.innerHeight, isPhone: window.innerWidth < WINDOWPHONESIZE});

const handleResize = () => {
    signalWindowSize.value = {width: window.innerWidth, height: window.innerHeight, isPhone: window.innerWidth < WINDOWPHONESIZE};
}

window.addEventListener('resize', handleResize);



export default signalWindowSize;