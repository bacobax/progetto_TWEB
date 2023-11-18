import { useState, useEffect, useCallback } from 'react';
import { isMacOs } from '../utils/functions';

interface KeyListeners {
    [key: string]: (e: KeyboardEvent) => void;
}

const isAlphanumeric = (key: string) => /[a-z0-9]/i.test(key);

export const useKeyCombo = (keycombos: KeyListeners) => {
    const [auxPressed, setAuxPressed] = useState(false);

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;

            if ((isMacOs() && key === 'Meta') || (!isMacOs() && key === 'Control')) {
                e.preventDefault(); // Prevent browser shortcuts
                setAuxPressed(true);
            } else if (isAlphanumeric(key) && auxPressed && keycombos[key]) {
                keycombos[key](e);
            }
        },
        [auxPressed, keycombos]
    );

    const handleKeyUp = useCallback(
        (e: KeyboardEvent) => {
            const key = e.key;

            if ((isMacOs() && key === 'Meta') || (!isMacOs() && key === 'Control')) {
                key === 'Meta' ? setAuxPressed(false) : setAuxPressed(false);
            }
        },
        []
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyDown, handleKeyUp]);

    return;
};
