import {useCallback, useState} from "react";
import {sliceArray} from "../constants/constants";
interface ReturnType<T> {
    current: T[];
    next: () => void;
    prev: () => void;
    currentIdx: number;
}
export const useSlice = <T>(array: T[], size: number): ReturnType<T> => {
    const [index, setIndex] = useState(0);
    const matrix = sliceArray(array, size);



    const current = matrix[index%matrix.length];

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
        currentIdx: index

    }

}
