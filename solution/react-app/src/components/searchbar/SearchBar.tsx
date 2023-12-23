import Modal from "../UI/modal/Modal";
import useModal from "../../hooks/useModal";
import styles from "./SearchBar.module.css";
import {ChangeEvent, FormEvent, useCallback} from "react";
import {useKeyCombo} from "../../hooks/useKeyCombo";
import FakeSearchBar from "./FakeSearchBar";
import React from "react";
import useSearch from "../../hooks/useSearch";
import FoundedList from "./FoundedList";

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

    const {searchTerm, setSearchTerm, loading, data} = useSearch<ResponseType>({clubs: [], players: []}, 1000);

    /**
     * This is a custom hook that listens to the key combo ctrl+k or cmd+k in order to toggle the modal
     */
    useKeyCombo({"k" :( isModalOpen ? closeModal : openModal)});

    /**
     * This useEffect is used to trigger the search after 500ms of inactivity
     */




    const handleSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    },[]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    },[setSearchTerm]);


    return (
        <>
            <FakeSearchBar onClick={openModal}  />
            <Modal classNames={{
                modal: styles.modal,
                content: styles.content,
            }} onClose={closeModal} title={""} opened={isModalOpen}>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search Everything..." onChange={handleChange} autoFocus={true} value={searchTerm}/>
                </form>
                <FoundedList data={data} loading={loading}/>
            </Modal>
        </>

    )


}

export default SearchBar;