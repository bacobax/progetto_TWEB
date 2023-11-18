import Modal from "../UI/modal/Modal";
import useModal from "../../hooks/useModal";
import styles from "./SearchBar.module.css";
import {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {useKeyCombo} from "../../hooks/useKeyCombo";
import FakeSearchBar from "./FakeSearchBar";
import React from "react";
interface SearchBarProps{
    onSearch: (term: string) => void;

}

const SearchBar : React.FC<SearchBarProps> = ({onSearch}) => {

    const { closeModal, isModalOpen, openModal } = useModal(true);

    const [searchTerm, setSearchTerm] = useState("");

    /**
     * This is a custom hook that listens to the key combo ctrl+k or cmd+k in order to toggle the modal
     */
    useKeyCombo({"k" :( isModalOpen ? closeModal : openModal)});

    /**
     * This useEffect is used to trigger the search after 500ms of inactivity
     */
    useEffect(() => {
        const id = setTimeout(() => {
            if(searchTerm.trim().length !==0){
                onSearch(searchTerm);
            }

        },500);
        return () => {
            clearTimeout(id);
        }
    },[searchTerm, onSearch]);





    const handleSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchTerm);
    },[onSearch, searchTerm]);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    },[]);


    return (
        <>
            <FakeSearchBar onClick={openModal}  />
            <Modal className={styles.modal} onClose={closeModal} title={""} opened={isModalOpen}>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search Everything..." onChange={handleChange} autoFocus={true}/>
                </form>
            </Modal>
        </>

    )


}

export default SearchBar;