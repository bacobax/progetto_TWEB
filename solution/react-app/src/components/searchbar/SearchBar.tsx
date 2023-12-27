import Modal from "../UI/modal/Modal";
import useModal from "../../hooks/useModal";
import {ChangeEvent, FormEvent, useCallback} from "react";
import {useKeyCombo} from "../../hooks/useKeyCombo";
import FakeSearchBar from "./FakeSearchBar";
import React from "react";
import useSearch from "../../hooks/useSearch";
import FoundedList from "./FoundedList";
import {Button, Input, Tooltip} from "@nextui-org/react";
import { GrClear } from "react-icons/gr";

export interface ResponseType {
    clubs: {
        clubId: number,
        name: string,
    }[],
    players: {
        playerId: number,
        name: string,
    }[],
}

const SearchBar : React.FC = () => {

    const { closeModal, isModalOpen, openModal } = useModal(false);

    const {searchTerm, setSearchTerm, loading, data, setData} = useSearch<ResponseType>({clubs: [], players: []}, 1000);

    /**
     * This is a custom hook that listens to the key combo ctrl+k or cmd+k in order to toggle the modal
     */
    useKeyCombo({"k" :( isModalOpen ? closeModal : openModal)});

    /**
     * This useEffect is used to trigger the search after 500ms of inactivity
     */


    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    },[setSearchTerm]);

    const handleClear = useCallback(() => {
        setSearchTerm("");
        setData({clubs: [], players: []});
    } , [setSearchTerm, setData]);

    return (
        <>
            <FakeSearchBar onClick={openModal}  />
            <Modal classNames={{
                modal: "bg-gray-900/50 backdrop-blur text-white flex flex-col max-h-[40vh] border-[1px] border-gray-900 rounded-md overflow-hidden",
                content: "flex flex-col gap-[10px] p-[20px]"
            }} onClose={closeModal} title={""} opened={isModalOpen}>
                <Input type="text" className={"dark"} label={"search everything"} value={searchTerm} onChange={handleChange} autoFocus={true} endContent={
                    <Tooltip className={"dark text-white"} content={"clear"}>
                        <Button isIconOnly={true} onClick={handleClear}>
                            <GrClear className={"w-4/5 h-4/5 text-danger"} />
                        </Button>
                    </Tooltip>
                }/>
                {(data.clubs.length !==0 || data.players.length!==0 ) &&  <FoundedList data={data} loading={loading}/>}
                {(data.clubs.length ===0 && data.players.length ===0 && searchTerm.trim().length === 0) && <h1 className={"text-center text-primary font-bold"}>Search for a player or a team</h1>}
                {(data.clubs.length ===0 && data.players.length ===0 && searchTerm.trim().length > 0) && <h1 className={"text-center text-danger-400"}>No results found</h1>}
            </Modal>
        </>

    )


}

export default SearchBar;