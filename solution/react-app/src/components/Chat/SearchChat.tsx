import React, {FC, useCallback, useState} from "react";
import Modal from "../UI/modal/Modal";
import useSearch from "../../hooks/useSearch";
import {Input, Skeleton, Button, Textarea} from "@nextui-org/react";
import {FaSearch} from "react-icons/fa";
import { IoChatbubbles } from "react-icons/io5";
import {getToken} from "../../auth/authFunctions";
import {Room} from "./types";
interface SearchChatProps {
    onClose: () => void;
    opened: boolean;
    onSelectRoom: (roomID: string) => void;

}
/**
 * SearchChat is a functional component in React.
 * It accepts props of type SearchChatProps which includes:
 * - onClose: A function to be executed when the modal is closed.
 * - opened: A boolean indicating whether the modal is open.
 * - onSelectRoom: A function to be executed when a chat room is selected.
 *
 * The component uses the useSearch custom hook to manage the search functionality. The hook returns an object with the following properties:
 * - setSearchTerm: A function to set the search term.
 * - data: An array of Room objects representing the search results.
 * - searchTerm: The current search term.
 * - loading: A boolean indicating whether the search is in progress.
 * - setData: A function to set the search results.
 *
 * The component maintains a state variable selectedRoomIdx, which is the index of the currently selected room in the search results.
 *
 * The handleSubmit function is a handler for the form submission event. It prevents the default form submission behavior.
 *
 * The onJoinPressed function is a handler for the join button click event. It calls the onSelectRoom prop with the ID of the currently selected room.
 *
 * The handleSearchTermChange function is a handler for the search term input change event. It sets the search term to the value of the input.
 *
 * The handleClose function is a handler for the modal close event. It resets the search term, search results, and selected room index, and calls the onClose prop.
 *
 * The component returns a Modal component from the @nextui-org/react library. The Modal includes a form with an Input for the search term and a list of search results.
 * Each search result is displayed in a div element with the room name and a join button. The div is styled with Tailwind CSS classes and changes its background color when it is selected.
 * If a room is selected, the Modal also includes a Textarea displaying the room description and a confirmation message and buttons for joining the room or cancelling the selection.
 */
export const SearchChat:FC<SearchChatProps> = ({onClose, opened, onSelectRoom}) => {

    const {setSearchTerm, data, searchTerm, loading, setData} = useSearch<Room[]>([] , 1000, "/room" , getToken());
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(-1);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const onJoinPressed = () => {
        onSelectRoom(data[selectedRoomIdx]._id);
    }

    const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }
    const handleClose = useCallback(()=>{
        setSelectedRoomIdx(-1);
        setSearchTerm("");
        setData([]);
        onClose();
    } , [onClose, setSearchTerm, setData]);

    return (
        <Modal onClose={handleClose} title={"Search a Chat"} opened={opened} classNames={{
            modal: "bg-gray-900 text-white",
            content: "mt-4 overflow-y-scroll gap-[10px] flex flex-col"
        }}>
            <form onSubmit={handleSubmit}>
                <Input size={"md"} type="text" label="Name Of The Chat" className={"dark"} value={searchTerm}
                       onChange={handleSearchTermChange}
                       endContent={<Button isIconOnly={true} type={"submit"}><FaSearch className={"w-3/4 h-3/4 text-blue-400"}/></Button>}
                />
            </form>

            {!loading && data.length === 0 && <h1 className={"text-center text-gray-400"}>No results found</h1>}
            <div className={"flex flex-col items-center w-full h-full gap-[10px]"}>
                {loading && Array.from({length:3} , (_, index) => <Skeleton key={index} className={"w-full h-10 bg-gray-700 rounded-md my-2 animate-pulse dark"}></Skeleton>)}

                {!loading && data.length > 0 && data.map((room, index) => (
                    <div key={index} onClick={()=>{
                        setSelectedRoomIdx(index);
                    }}
                         className={`flex justify-center items-center w-full gap-[30px] pt-[10px] pb-[10px] rounded-medium hover:bg-blue-800 cursor-pointer duration-250 ${selectedRoomIdx === index ? "bg-blue-800 shadow-blue-700/50" : "bg-gray-900"}`}>
                        <IoChatbubbles className={"text-2xl text-blue-400"}/>
                        <h1 className={"text-xl font-bold"}>{room.name}</h1>
                    </div>
                ))}
            </div>
            {
                selectedRoomIdx !== -1 && (
                    <div className={"flex flex-col w-full items-center gap-[30px]"}>
                        {!!data[selectedRoomIdx].description ? <Textarea
                            isReadOnly
                            label="Description"
                            variant="flat"
                            labelPlacement="outside"
                            placeholder="Enter your description"
                            defaultValue={data[selectedRoomIdx].description}
                            className="max-w-full dark"
                            classNames={{
                                label: "text-xl"
                            }}
                        /> : <h1 className={"text-xl text-center text-gray-400"}>No description</h1>}
                        <p className={"text-default"}>Are You Sure to Join this room?</p>
                        <div className={"flex flex-row gap-[10px]"}>
                            <Button  onClick={()=>{
                                setSelectedRoomIdx(-1);
                            }} className={"bg-transparent border-1 border-gray-500 text-default font-bold"}>Cancel</Button>
                            <Button className={"bg-violet-400 text-black font-bold"} onClick={onJoinPressed}>Join</Button>
                        </div>
                    </div>
                )
            }

        </Modal>
    );
};
