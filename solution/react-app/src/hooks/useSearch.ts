import {useEffect, useState} from "react";
import useFetch from "./useFetch";
import {getMainServerPath} from "../constants/constants";

const useSearch = <T>(initialData: T , delayMillisec: number) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {fetchData, loading} = useFetch();

    const [data, setData] = useState<T>(initialData);



    useEffect(() => {
        const abortController = new AbortController();
        const id = setTimeout(() => {
            if(searchTerm.trim().length !==0){
                const path = "/search/" + searchTerm;

                fetchData<{status:string, data: T}>({url: getMainServerPath(path), abortController} , (data)=>{
                    console.log({data})
                    setData(data.data);
                })
            }
        },delayMillisec);
        return () => {
            abortController.abort();
            clearTimeout(id);
        }
    },[searchTerm, fetchData, delayMillisec]);

    return {searchTerm, setSearchTerm, loading, data};
}

export default useSearch;