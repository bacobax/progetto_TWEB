import {useCallback, useState} from "react";


interface HeadersInit {
    [key: string]: string;
}
export interface Params{
    url: string;

    method?: string;
    body?: string;
    headers?: HeadersInit;

}

interface ReturnType<T>{
    loading: boolean;
    error: Error;
    fetchData: (params: Params, callback?: (data: T) => void) => void;
}

type Error = string | null

type FetchData<T> = (params: Params, callback?: (data: T) => void) => void

/**
 * @description useFetch hook to generalize fetch requests
 * @return {Object} loading, error, fetchData
 * @example
 * const {loading, error, fetchData} = useFetch();
 * fetchData({url: "https://jsonplaceholder.typicode.com/todos/1", method: "GET"},
 * (data) => {
 *     console.log(data)
 *  });
 *
 *
 */
const useFetch = <T>( ):ReturnType<T> => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error>(null);
    /**
     * @description Fetch data from url
     * @param {Params} params
     * @param {Function} callback - optional callback function to handle data
     * @return {void}
     * @example
     * fetchData({url: "https://jsonplaceholder.typicode.com/todos/1", method: "GET"},
     * (data) => {
     *    console.log(data)
     *    });
     */
    const fetchData: FetchData<T> = useCallback( async (params, callback ) => {
        setLoading(true);
        try {
            const res = await fetch(params.url, {
                method: params.method || "GET",
                body: params.body,
                headers: params.headers
            });
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            const data = await res.json();
            if(callback) callback(data);

        } catch (err : any){
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, error, fetchData};

}

export default useFetch;