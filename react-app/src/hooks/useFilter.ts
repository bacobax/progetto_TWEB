import {useCallback, useMemo, useReducer} from 'react';

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
    const initialState: StateType<T> = {
        data: initialData,
        filters: [],
    };

    const [state, dispatch] = useReducer(reducer as (state: StateType<T>, action: Action<T>) => StateType<T>, initialState);


    const { data, filters } = state;



    const addFilter = useCallback((key: string, filter: FilterFunction<T>) => {
            dispatch({ type: 'ADD_FILTER', payload: { key, filter } });
        },[]
    );

    const removeFilter = useCallback ((key: string) => {
        dispatch({ type: 'REMOVE_FILTER', payload: key });
    },[]);

    const clearFilters = useCallback (() => {
        dispatch({ type: 'CLEAR_FILTERS' });
    },[]);

    const filteredData = useMemo(()=>
         filters.reduce((filteredData, filter) => {
            return filteredData.filter(filter.filter);
        }, data)
    , [filters, data])


    const filterNames = useMemo(() => filters.map((filter) => filter.key), [filters]);

    return { filteredData, addFilter, removeFilter, clearFilters, filterNames };
};

export default useFilter;
