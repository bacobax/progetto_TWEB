import { useLocation, useNavigate } from 'react-router-dom';
import {useCallback} from "react";

/**
 * Custom hook to manage query parameters in a URL.
 */
const useQueryParams = () => {
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Retrieves the value of a query parameter.
     * @param param The name of the query parameter.
     * @returns The value of the query parameter.
     */
    const getQueryParam =useCallback ((param:string) => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get(param);
    },[location.search]);

    /**
     * Sets the value of a query parameter. Adds the parameter if it doesn't exist.
     * @param param The name of the query parameter.
     * @param value The value of the query parameter.
     */
    const setQueryParam = (param:string, value:string) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(param, value);
        navigate({ search: queryParams.toString() });
    };

    /**
     * Removes a query parameter from the URL.
     * @param param The name of the query parameter to remove.
     */
    const removeQueryParam = (param:string) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete(param);
        navigate({ search: queryParams.toString() });
    };

    return { getQueryParam, setQueryParam, removeQueryParam };
};

export default useQueryParams;
