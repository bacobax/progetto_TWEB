import { useState, useEffect } from "react";
import { isMacOs } from "../utils/functions";

interface KeyListeners {
    [key: string]: (e: KeyboardEvent) => void;
}

const isAlphanumeric = (key: string) => {
    const alphanumeric = "abcdefghijklmnopqrstuvwxyz1234567890";
    return alphanumeric.includes(key);
};

export const useKeyCombo = (keycombos: KeyListeners) => {
    const [auxPressed, setAuxPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (isMacOs() && key === "Meta") {
                setAuxPressed(true);
                return;
            }
            if (!isMacOs() && key === "Control") {
                setAuxPressed(true);
                return;
            }
            if (isAlphanumeric(key) && auxPressed && keycombos.hasOwnProperty(key)) {
                keycombos[key](e);
                return;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key;
            if (isMacOs() && key === "Meta") {
                setAuxPressed(false);
                return;
            }
            if (!isMacOs() && key === "Control") {
                setAuxPressed(false);
                return;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [auxPressed, keycombos]);

    return;
};
