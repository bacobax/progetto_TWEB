import {useEffect, useState} from "react";
import {ShortPlayer} from "../constants/types";
import {URL_SHORT_PLAYERS} from "../constants/constants";
import useFetch from "./useFetch";


const useLoadPlayers = (pageSize: number) => {

    const [players, setPlayers] = useState<ShortPlayer[]>([]);
    const [pageNumber , setPageNumber] = useState(1);
    const {loading, error, fetchData, setError} = useFetch();



    const addMorePlayers = () => {

        fetchData<{ data: ShortPlayer[], status: string, message?: string }>({
            url: URL_SHORT_PLAYERS(pageNumber + 1,pageSize),
            method: "GET"
        },(data) => {
            if (data.status !== "success") {
                setError(data.message ? data.message : "An error occurred");
                return;
            }
            if (!data.data) {
                setError ("An error occurred");
                return;
            }
            setPlayers(prev => [...prev, ...data.data])
            setPageNumber(prev => prev + 1);
        });

    }


    useEffect(() => {
        fetchData<{ data: ShortPlayer[], status: string, message?: string }>({
            url: URL_SHORT_PLAYERS(1, pageSize),
            method: "GET"
        }, (data) => {
            if (data.status !== "success") {
                setError(data.message ? data.message : "An error occurred");
                return;
            }
            if (!data.data) {
                setError("An error occurred");
                return;
            }
            setPlayers(data.data);

        });
    }, [fetchData, setError, pageSize]);

    return {loading, error, players, addMorePlayers};
};

export default useLoadPlayers;