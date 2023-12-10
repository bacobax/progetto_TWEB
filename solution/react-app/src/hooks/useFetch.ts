import {useCallback, useState} from "react";


interface HeadersInit {
    [key: string]: string;
}
export interface Params{
    url: string;

    method?: string;
    body?: string;
    headers?: HeadersInit;
    token?: string;

}


type FetchData = <T>(params: Params, callback?: (data: T) => void) => void
interface ReturnType{
    loading: boolean;
    error: Error;
    fetchData: FetchData;
    setError: (error: Error) => void;
}

type Error = string | null



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
const useFetch = ( ):ReturnType => {
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
    const fetchData: FetchData = useCallback( async (params, callback ) => {
        setLoading(true);
        const headers = params.token ? {...params.headers, "Authorization": `Bearer ${params.token}` , "Content-Type": "application/json"} : {...params.headers, "Content-Type": "application/json"};
        try {
            const res = await fetch(params.url, {
                method: params.method || "GET",
                body: params.body,
                headers: headers
            });

            const data = await res.json();
            if(callback) callback(data);

        } catch (err : any){
            console.log({err})
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, []);

    return {loading, error, fetchData, setError};

}

export default useFetch;