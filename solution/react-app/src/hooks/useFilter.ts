import {useState, useMemo, useCallback} from 'react';

type Filter<T> = (item: T) => boolean;

interface FilterConfig<T> {
    key: string;
    filter: Filter<T>;
}

interface UseFilterResult<T> {
    filteredData: T[];
    filterNames: string[];
    addFilter: (config: FilterConfig<T>) => void;
    applyFilters: () => void;
    resetFilters: () => void;
    removeFilter: (key: string) => void;
}

function useFilter<T>(data: T[]): UseFilterResult<T> {
    const [filters, setFilters] = useState<FilterConfig<T>[]>([]);

    const applyFilters =() => {
        // Applying all filters to the data

        return filters.reduce((filtered: T[], currentFilter) => {
            return filtered.filter(currentFilter.filter);
        }, data);

    }

    const setFilter = (config: FilterConfig<T>) => {

        setFilters(prev => {
            const filteredFilters = prev.filter(filter => filter.key !== config.key);
            return [...filteredFilters, config];
        })

    }

    const removeFilter = (key: string) => {
        setFilters((prevFilters) => prevFilters.filter((filter) => filter.key !== key));
    };

    const resetFilters = () => {
        setFilters([]);
    };

    const filterNames = filters.map((filter) => filter.key);


    return {
        filteredData: applyFilters(),
        filterNames,
        addFilter: setFilter,
        applyFilters,
        resetFilters,
        removeFilter,
    };
}

export default useFilter;
