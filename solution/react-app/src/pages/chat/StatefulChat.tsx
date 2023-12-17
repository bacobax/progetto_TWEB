import { FC, useEffect, useState, useCallback } from "react";
import { getUserInfo } from "../../auth/authFunctions";
import { Room } from "../../constants/types";
import useFetch from "../../hooks/useFetch";
import { URL_NEW_MESSAGE, URL_ROOM_FROM_USER } from "../../constants/constants";
import ChatList from "./ChatList";
import { Navigate } from "react-router-dom";
import ChatSpace from "./ChatSpace";
import { socket } from "../../socket";
import useWindowSize from "../../hooks/useWindowSize";
//import ErrorMessage from "./ErrorMessage"; // Assuming ErrorMessage is a new component for displaying errors

interface StatefulChatProps {}

const StatefulChat: FC<StatefulChatProps> = () => {
    const [userRooms, setUserRooms] = useState<Room[]>([]);
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(-1);
    const [user, setUser] = useState(getUserInfo());
    const [isChatList, setIsChatList] = useState<boolean>(true);

    const { loading: loadingRooms, error: errorRooms, setError: setErrorRooms, fetchData: fetchRoomsData } = useFetch();
    const { loading: loadingNewMessage, error: errorNewMessage, setError: setErrorMessage, fetchData: fetchSendMessage } = useFetch();

    const { width } = useWindowSize();
    const isPhone = width < 640;

    useEffect(() => {
        if (!user) {
            setErrorRooms("Not logged in");
            return;
        } else {
            fetchRoomsData<{ status: string, data: Room[], message?: string }>({ url: URL_ROOM_FROM_USER(user._id), token: user.token }, (data) => {
                if (data.status === "success") {
                    setUserRooms(data.data);
                } else {
                    setErrorRooms(data.message ? data.message : "");
                }
            })
        }
    }, [user, fetchRoomsData, setErrorRooms]);

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

        return () => {
            socket.off("chat");
            socket.disconnect();
        };
    }, [user]);

    const handleNewMessage = useCallback((text:string) => {
        if(!user) return;
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

    const handleSelectRoom = useCallback((index:number) => {
        if(!user) return;
        setSelectedRoomIdx(index);
        setIsChatList(false);
        socket.emit("create or join", userRooms[index]._id, user._id);
    }, [userRooms, user]);

    if (!user) {
        return <Navigate to={'/auth'} />;
    }

    if (!loadingRooms && errorRooms) {
        return <h1>Ciao</h1>;
    }

    return (
        <>
            {((isPhone && isChatList) || !isPhone) &&
                <ChatList
                    rooms={userRooms}
                    loading={loadingRooms}
                    user={user}
                    onSelectRoom={handleSelectRoom}
                    selectedRoomIdx={selectedRoomIdx}
                    isPhone={isPhone} />
            }
            {((isPhone && !isChatList) || !isPhone) &&
                <ChatSpace room={userRooms[selectedRoomIdx]}
                           loadingRooms={loadingRooms}
                           loadingMessage={loadingNewMessage}
                           user={user} onNewMessage={handleNewMessage}
                           errorNewMessage={errorNewMessage}
                           isPhone={isPhone} onBack={() => { setIsChatList(true) }}
                           width={width} />
            }
        </>
    );
};

export default StatefulChat;
