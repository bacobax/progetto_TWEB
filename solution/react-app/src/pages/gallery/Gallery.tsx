import React, {useEffect, useState} from "react";
import SmartGallery from "./SmartGallery";
import useFetch from "../../hooks/useFetch";
import {ShortPlayer} from "../../constants/types";
import {URL_SHORT_PLAYERS} from "../../constants/constants";
import Loading from "../../components/animations/Loading";
import Modal from "../../components/UI/modal/Modal";
import useModal from "../../hooks/useModal";




const Gallery: React.FC = ()=>{

    const {loading, setError, error, fetchData} = useFetch();
    const [players, setPlayers] = useState<ShortPlayer[]>([]);


    useEffect(() => {
        fetchData<{ data:ShortPlayer[], status:string, message?:string }>({url: URL_SHORT_PLAYERS, method: "GET"}, (data) => {
            if(data.status !== "success"){
                setError(data.message? data.message: "An error occurred");
                return;
            }
            if(!data.data){
                setError("An error occurred");
                return;
            }
            setPlayers(data.data);

        });
    }, [fetchData, setError]);

    return <div style={{
        minHeight: "100vh",
        minWidth : "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    }}>

        {!loading && !error && <SmartGallery elements={players}/>}
        {loading && <Loading />}
        <Modal onClose={()=>{

        }} title={"Error pop-up"} opened={!!error}>
            {error}
        </Modal>

    </div>
}

export default Gallery;