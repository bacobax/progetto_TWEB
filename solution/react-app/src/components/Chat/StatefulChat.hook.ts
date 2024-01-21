import {useCallback, useEffect, useRef, useState} from "react";
import {getUserInfo} from "../../auth/authFunctions";
import useModal from "../../hooks/useModal";
import useFetch from "../../hooks/useFetch";
import {
    URL_CREATE_ROOM,
    URL_JOIN_ROOM,
    URL_LEAVE_ROOM,
    URL_NEW_MESSAGE,
    URL_ROOM_FROM_USER
} from "../../constants/constants";
import {socket} from "../../socket";
import {useSearchParams} from "react-router-dom";
import {Room} from "./types";
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
const useStatefulChat = () =>{
    const [userRooms, setUserRooms] = useState<Room[]>([]);
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(-1);
    const [user, setUser] = useState(getUserInfo());
    const [isChatList, setIsChatList] = useState<boolean>(true);
    const [searchParams,   ] = useSearchParams();

    const {closeModal: closeNewChatModal, openModal: openNewChatModal,isModalOpen: isNewChatModalOpen} = useModal(false);
    const {isModalOpen: isSeaerchChatModalOpen, closeModal: closeSearchChatModal, openModal:  openSearchChatModal} = useModal(false);
    const {loading: loadingRooms, error: errorRooms, setError: setErrorRooms, fetchData: fetchRoomsData} = useFetch();
    const {loading: loadingNewMessage, error: errorNewMessage, setError: setErrorMessage, fetchData: fetchSendMessage} = useFetch();


    const listenerAdded = useRef(false);

    // Effect hook for setting up chat application
    useEffect(() => {
        // Connect to socket and set up listeners
        if(!listenerAdded.current){
            socket.connect();
            socket.on("chat", (room, userId, userName, chatText, messageID) => {
                if (userId !== user?._id) {
                    console.log("RECEIVED CHAT")
                    setUserRooms(prevRooms => {

                        console.log("ADDING CHAT")
                        const newRooms = [...prevRooms];
                        const roomIdx = newRooms.findIndex(r => r._id === room);
                        if (roomIdx !== -1) {
                            if(newRooms[roomIdx].messages.find(m => m.id === messageID)) return newRooms;
                            newRooms[roomIdx].messages.push({
                                from: {
                                    _id: userId,
                                    name: userName,
                                    id: userId,
                                },
                                text: chatText,
                                id: messageID
                            });
                        }
                        return newRooms;
                    });
                }
            });
            listenerAdded.current = true;
        }
        // Fetch user's rooms and join rooms
        if (!user) {
            setErrorRooms("Not logged in");
            return;
        } else {
            fetchRoomsData<{ status: string, data: Room[], message?: string }>({url: URL_ROOM_FROM_USER, token: user.token}, (data) => {
                if (data.status === "success") {
                    setUserRooms(data.data);
                    data.data.forEach((room) => {
                        socket.emit("create or join", room._id, user._id, user.name);
                    });

                } else {
                    setErrorRooms(data.message ? data.message : "");
                }
            })
        }

        const searchParamPlayerID = searchParams.get("player");
        if(searchParamPlayerID){
            openNewChatModal();
        }


        return () => {
            socket.off("chat");
            socket.disconnect();
            listenerAdded.current = false;
        };
    }, [user, fetchRoomsData, setErrorRooms, setUserRooms, searchParams, openNewChatModal ]);



    const handleNewMessage = useCallback((text: string) => {
        if (!user) return;
        setUserRooms((prevRooms) => {
            const newRooms = [...prevRooms];
            newRooms[selectedRoomIdx].messages.push({
                from: {
                    _id: user._id,
                    name: user.name,
                    id: user._id,
                },
                text: text,
            });
            return newRooms;
        });
        fetchSendMessage<{ status: string, data: any, message?: string }>({
            url: URL_NEW_MESSAGE(userRooms[selectedRoomIdx]._id),
            token: user.token,
            method: "POST",
            body: JSON.stringify({
                text: text,
            })
        }, (data) => {
            if (data.status !== "success") {
                setErrorMessage(data.message ? data.message : "Error while sending message");
                if (data.message?.includes("jwt expired")) {
                    setUser(null);
                }
            }
            console.log("EMITTING CHAT")
            socket.emit("chat", userRooms[selectedRoomIdx]._id, user._id, user.name, text, new Date().getTime());
        });
    }, [user, userRooms, selectedRoomIdx, fetchSendMessage, setErrorMessage]);

    const handleSelectRoom = useCallback((index: number) => {
        if (!user) return;
        setSelectedRoomIdx(index);
        setIsChatList(false);
    }, [ user]);

    const handleNewChat = useCallback((name: string, description:string) => {
        if (!user) return;
        fetchRoomsData<{ status: string, data: Room, message?: string }>({
            url: URL_CREATE_ROOM,
            token: user?.token,
            method: "POST",
            body: JSON.stringify({name,description})},
            ({data, status, message}) => {
            if (status === "success") {
                setUserRooms(prevRooms => {
                    const newRooms = [...prevRooms];
                    newRooms.push(data);
                    return newRooms;
                });
                setSelectedRoomIdx(userRooms.length);
                setIsChatList(false);
                socket.emit("firstJoin", data._id, user._id, user.name);
                closeNewChatModal();
            } else {
                setErrorRooms(message ? message : "Error while creating room");
            }
        });

    }, [user, userRooms, closeNewChatModal, setErrorRooms, fetchRoomsData]);

    const handleSelectRoomToJoin = useCallback ((roomID: string) => {
        if(!user) return;
        fetchRoomsData<{ status: string, data: Room, message?: string }>({url: URL_JOIN_ROOM(roomID), token: user.token, method: "POST"}, ({data, status, message}) => {
            if (status === "success") {
                setUserRooms(prevRooms => {
                    const newRooms = [...prevRooms];
                    newRooms.push(data);
                    return newRooms;
                });
                setSelectedRoomIdx(userRooms.length);
                setIsChatList(false);
                socket.emit("firstJoin", data._id, user._id, user.name);
                closeSearchChatModal();
            } else {
                setErrorRooms(message ? message : "Error while creating room");
            }
        });
    },[user, userRooms, closeSearchChatModal, setErrorRooms, fetchRoomsData]);


    const handleLeaveRoom = useCallback((roomID: string) => {
        if(!user) return;

        fetchRoomsData<{status:string, data: Room | null, message?:string}>({url:URL_LEAVE_ROOM(roomID) , token: user.token, method: "POST"}, (response) => {
            if(response.status === "success"){
                setUserRooms(prevRooms => {
                    const newRooms = [...prevRooms];
                    const roomIdx = newRooms.findIndex(r => r._id === roomID);
                    if(roomIdx !== -1){
                        newRooms.splice(roomIdx,1);
                    }
                    return newRooms;
                });
                setSelectedRoomIdx(-1);
                setIsChatList(true);
                socket.emit("leave", roomID, user._id);
            }else{
                setErrorRooms(response.message ? response.message : "Error while leaving room");
            }

        })
    }, [user, setUserRooms, setSelectedRoomIdx, setErrorRooms, fetchRoomsData]);




    return {
        userRooms,
        selectedRoomIdx,
        user,
        isChatList,
        setIsChatList,
        closeNewChatModal,
        openNewChatModal,
        isNewChatModalOpen,
        loadingRooms,
        errorRooms,
        loadingNewMessage,
        errorNewMessage,
        handleNewMessage,
        handleSelectRoom,
        handleNewChat,
        handleSelectRoomToJoin,
        isSeaerchChatModalOpen,
        openSearchChatModal,
        closeSearchChatModal,
        handleLeaveRoom,
    };
}


export default useStatefulChat;