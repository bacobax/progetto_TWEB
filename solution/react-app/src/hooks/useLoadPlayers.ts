import {useEffect} from "react";
import {ShortPlayer} from "../constants/types";
import {URL_SHORT_PLAYERS} from "../constants/constants";
import useSignalFetch from "./signalFetch";
import {useSignal} from "@preact/signals-react";


const useLoadPlayers = () => {
    const {loading, error, fetchData} = useSignalFetch();
    const players = useSignal<ShortPlayer[]>([]);
    const pageNumber = useSignal(1);


    const addMorePlayers = () => {

        fetchData<{ data: ShortPlayer[], status: string, message?: string }>({
            url: URL_SHORT_PLAYERS(pageNumber.value + 1,20),
            method: "GET"
        },(data) => {
            if (data.status !== "success") {
                error.value = (data.message ? data.message : "An error occurred");
                return;
            }
            if (!data.data) {
                error.value = ("An error occurred");
                return;
            }
            players.value = [...players.value, ...data.data];
        });
        pageNumber.value = pageNumber.value + 1;
    }

    useEffect(() => {
        fetchData<{ data: ShortPlayer[], status: string, message?: string }>({
            url: URL_SHORT_PLAYERS(1,20),
            method: "GET"
        }, (data) => {
            if (data.status !== "success") {
                error.value = (data.message ? data.message : "An error occurred");
                return;
            }
            if (!data.data) {
                error.value = ("An error occurred");
                return;
            }
            players.value = (data.data);

        });
    }, [pageNumber.value, fetchData, error, players]);

    return {loading, error, players, addMorePlayers};
};

export default useLoadPlayers;