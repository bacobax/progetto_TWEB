import React, {FC, useCallback, useEffect, useState} from "react";
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
