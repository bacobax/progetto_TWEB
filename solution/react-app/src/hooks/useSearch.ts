import {useEffect, useState} from "react";
import useFetch from "./useFetch";
import {getMainServerPath} from "../constants/constants";

const useSearch = <T>(initialData: T , delayMillisec: number, pathBeforeSearch?:string, token?:string|null) => {
    const [searchTerm, setSearchTerm] = useState("");
    const {fetchData, loading} = useFetch();

    const [data, setData] = useState<T>(initialData);



    useEffect(() => {
        const id = setTimeout(() => {
            if(searchTerm.trim().length !==0){
                const path = pathBeforeSearch ? pathBeforeSearch + "/search/" + searchTerm : "/search/" + searchTerm;
                const obj = (token!==undefined && token !== null) ? {url: getMainServerPath(path), token} : {url: getMainServerPath(path)};
                fetchData<{status:string, data: T}>(obj , (data)=>{
                    console.log({data})
                    setData(data.data);
                })
            }

        },delayMillisec);
        return () => {
            clearTimeout(id);
        }
    },[searchTerm, fetchData, delayMillisec, pathBeforeSearch, token]);

    return {searchTerm, setSearchTerm, loading, data, setData};
}

export default useSearch;