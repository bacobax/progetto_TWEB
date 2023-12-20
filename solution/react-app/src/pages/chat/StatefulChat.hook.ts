import {useCallback, useEffect, useState} from "react";
import {Room} from "../../constants/types";
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

const useStatefulChat = () =>{
    const [userRooms, setUserRooms] = useState<Room[]>([]);
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(-1);
    const [user, setUser] = useState(getUserInfo());
    const [isChatList, setIsChatList] = useState<boolean>(true);

    const {closeModal: closeNewChatModal, openModal: openNewChatModal,isModalOpen: isNewChatModalOpen} = useModal(false);
    const {isModalOpen: isSeaerchChatModalOpen, closeModal: closeSearchChatModal, openModal:  openSearchChatModal} = useModal(false);

    const {loading: loadingRooms, error: errorRooms, setError: setErrorRooms, fetchData: fetchRoomsData} = useFetch();
    const {loading: loadingNewMessage, error: errorNewMessage, setError: setErrorMessage, fetchData: fetchSendMessage} = useFetch();

    useEffect(() => {

        socket.connect();
        console.log("socket connected");
        socket.on("chat", (room, userId, userName, chatText) => {
            if (userId !== user?._id) {
                setUserRooms(prevRooms => {
                    const newRooms = [...prevRooms];
                    const roomIdx = newRooms.findIndex(r => r._id === room);
                    if (roomIdx !== -1) {
                        newRooms[roomIdx].messages.push({
                            from: {
                                _id: userId,
                                name: userName,
                                id: userId,
                            },
                            text: chatText,
                        });
                    }
                    return newRooms;
                });
            }
        });

        if (!user) {
            setErrorRooms("Not logged in");
            return;
        } else {
            fetchRoomsData<{ status: string, data: Room[], message?: string }>({url: URL_ROOM_FROM_USER(user._id), token: user.token}, (data) => {
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
        return () => {
            socket.off("chat");
            socket.disconnect();
        };
    }, [user, fetchRoomsData, setErrorRooms, setUserRooms ]);


    useEffect(() => {
        return () => {
            /*userRooms.forEach((room) => {
                socket.emit("leave", room._id, user?._id);
            });*/
        }
    }, [userRooms, user]);

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
            socket.emit("chat", userRooms[selectedRoomIdx]._id, user._id, user.name, text);
        });
    }, [user, userRooms, selectedRoomIdx, fetchSendMessage, setErrorMessage]);

    const handleSelectRoom = useCallback((index: number) => {
        if (!user) return;
        setSelectedRoomIdx(index);
        setIsChatList(false);
    }, [ user]);

    const handleNewChat = useCallback((name: string) => {
        if (!user) return;
        console.log(name);
        fetchRoomsData<{ status: string, data: Room, message?: string }>({url: URL_CREATE_ROOM, token: user?.token, method: "POST", body: JSON.stringify({name: name})}, ({data, status, message}) => {
            if (status === "success") {
                setUserRooms(prevRooms => {
                    const newRooms = [...prevRooms];
                    newRooms.push(data);
                    return newRooms;
                });
                setSelectedRoomIdx(userRooms.length);
                setIsChatList(false);
                socket.emit("first-join", data._id, user._id, user.name);
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
                socket.emit("first-join", data._id, user._id, user.name);
                closeSearchChatModal();
            } else {
                setErrorRooms(message ? message : "Error while creating room");
            }
        });
    },[user, userRooms, closeSearchChatModal, setErrorRooms, fetchRoomsData]);


    const handleLeaveRoom = useCallback((roomID: string) => {
        if(!user) return;

        fetchRoomsData<{status:string, data: Room | null, message?:string}>({url:URL_LEAVE_ROOM(roomID) , token: user.token, method: "POST"}, (response) => {
            console.log({leavingRoomRESPONSE: response})
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