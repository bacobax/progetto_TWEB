import {useCallback, useMemo, useReducer, useState} from 'react';

type FilterFunction<T> = (data: T) => boolean;

type Filter<T> = {
    key: string;
    filter: FilterFunction<T>;
};

type StateType<T> = {
    data: T[];
    filters: Filter<T>[];
};

type Action<T> =
    | { type: 'ADD_FILTER'; payload: Filter<T> }
    | { type: 'REMOVE_FILTER'; payload: string }
    | { type: 'CLEAR_FILTERS' };

const reducer = <T>(state: StateType<T>, action: Action<T>): StateType<T> => {
    switch (action.type) {
        case 'ADD_FILTER':
            if(!state.filters.find((filter) => filter.key === action.payload.key)) {
                return { ...state, filters: [...state.filters, action.payload] };
            }else{
                return state;
            }

        case 'REMOVE_FILTER':
            return {
                ...state,
                filters: state.filters.filter((filter) => filter.key !== action.payload),
            };
        case 'CLEAR_FILTERS':
            return { ...state, filters: [] };
        default:
            return state;
    }
};

const useFilter = <T>(initialData: T[]) => {


    const [filters, setFilters] = useState<Filter<T>[]>([]);






    const addFilter = useCallback((key: string, filter: FilterFunction<T>) => {
            setFilters((prev) => {
                if (prev.find((filter) => filter.key === key)) {
                    return prev;
                }
                return [...prev, { key, filter }];
            });
        },[]
    );

    const removeFilter = useCallback ((key: string) => {
        setFilters((prev) => prev.filter((filter) => filter.key !== key));
    },[]);

    const clearFilters = useCallback (() => {
        setFilters([]);
    },[]);

    const filteredData = useMemo(()=>
         filters.reduce((filteredData, filter) => {
            return filteredData.filter(filter.filter);
        }, initialData)
    , [filters, initialData])


    const filterNames = useMemo(() => filters.map((filter) => filter.key), [filters]);

    return { filteredData, addFilter, removeFilter, clearFilters, filterNames };
};

export default useFilter;
