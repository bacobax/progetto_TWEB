import { useReducer } from 'react';

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
            return { ...state, filters: [...state.filters, action.payload] };
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
    const initialState: StateType<T> = {
        data: initialData,
        filters: [],
    };

    const [state, dispatch] = useReducer(reducer as (state: StateType<T>, action: Action<T>) => StateType<T>, initialState);

    const applyFilters = (): T[] => {
        const { data, filters } = state;
        return filters.reduce((filteredData, filter) => {
            return filteredData.filter(filter.filter);
        }, data);
    };

    const addFilter = (key: string, filter: FilterFunction<T>) => {
        dispatch({ type: 'ADD_FILTER', payload: { key, filter } });
    };

    const removeFilter = (key: string) => {
        dispatch({ type: 'REMOVE_FILTER', payload: key });
    };

    const clearFilters = () => {
        dispatch({ type: 'CLEAR_FILTERS' });
    };

    return { filteredData: applyFilters(), addFilter, removeFilter, clearFilters };
};

export default useFilter;
