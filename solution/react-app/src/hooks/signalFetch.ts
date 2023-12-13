import {Signal, useSignal} from "@preact/signals-react";
import {useCallback} from "react";


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
    loading: Signal<boolean>;
    error: Signal<Error>;
    fetchData: FetchData;
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
const useSignalFetch = ( ):ReturnType => {
    const loading = useSignal(false);
    const error = useSignal<Error>(null);
    /**
     * @description Fetch data from url
     * @param  params
     * @param  callback - optional callback function to handle data
     * @return
     * @example
     * fetchData({url: "https://jsonplaceholder.typicode.com/todos/1", method: "GET"},
     * (data) => {
     *    console.log(data)
     *    });
     */
    const fetchData: FetchData = useCallback (async (params, callback ) => {
        loading.value = true;
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
            error.value = (err.message || "Something went wrong");
        } finally {
            loading.value = false;
        }
    },[ loading, error]);

    return {loading, error, fetchData};

}

export default useSignalFetch;