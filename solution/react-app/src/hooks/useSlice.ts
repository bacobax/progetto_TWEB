import React, {useCallback, useEffect, useMemo, useState} from "react";
import {sliceArray} from "../constants/constants";
interface ReturnType<T> {
    current: T[];
    next: () => void;
    prev: () => void;
    currentIdx: number;
    matrixLength: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const useSlice = <T>(array: T[], size: number): ReturnType<T> => {
    const [index, setIndex] = useState(0);

    const matrix = useMemo(() => sliceArray(array, size), [array, size]);
    const current = matrix[index];

    const next = useCallback(() => {
        setIndex((prev) => (prev + 1) % matrix.length);
    },[matrix.length]);

    const prev = useCallback(() => {
        setIndex((prev) => {
            const newIndex = (prev - 1)
            if(newIndex < 0) {
                return matrix.length - 1
            }
            return newIndex
        });
    },[matrix.length]);



    return {
        current,
        next,
        prev,
        currentIdx: index,
        matrixLength: matrix.length,
        setIndex,
    }
}
