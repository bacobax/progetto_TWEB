import {FC, useEffect, useState} from "react";
import {getUserInfo} from "../../auth/authFunctions";
import {Room} from "../../constants/types";
import useFetch from "../../hooks/useFetch";
import {URL_NEW_MESSAGE, URL_ROOM_FROM_USER} from "../../constants/constants";
import ChatList from "./ChatList";
import {Navigate} from "react-router-dom";
import ChatSpace from "./ChatSpace";

interface StatefulChatProps {

}

const StatefulChat: FC<StatefulChatProps> = () => {

    const [userRooms, setUserRooms] = useState<Room[]>([]);
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(-1);
    const {loading:loadingRooms, error:errorRooms, setError: setErrorRooms, fetchData: fetchRoomsData} = useFetch();
    const {loading:loadingNewMessage, error:errorNewMessage, setError: setErrorMessage, fetchData: fetchSendMessage} = useFetch();
    const [user, setUser] = useState(getUserInfo());



    useEffect(() => {
        if(!user){
            setErrorRooms("Not logged in");
            return;
        }else{
            fetchRoomsData<{status:string, data: Room[], message?:string}>({url:URL_ROOM_FROM_USER(user._id) , token: user.token}, (data)=>{
                if(data.status==="success"){
                    setUserRooms(data.data);
                }else{
                    setErrorRooms(data.message?data.message:"");
                }
            })
        }
    }, [fetchRoomsData, setErrorRooms, user]);

    if(!user){
        return <Navigate to={'/auth'} />;
    }

    if(!loadingRooms && errorRooms){
        return (
            <div style={{
                display:"flex" ,
                alignItems:"center" ,
                justifyContent: "center" ,
                width: "100vw" ,
                height: "100vh"
            }}>
                <h1 className="text-white"> Error retrieving chat information: {errorRooms} </h1>
            </div>)
    }

    const handleNewMessage = (text:string) => {
        setUserRooms((prevRooms)=>{
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
        })
        fetchSendMessage<{status:string, data: any, message?:string}>({
            url: URL_NEW_MESSAGE(userRooms[selectedRoomIdx]._id),
            token: user.token,
            method: "POST",
            body: JSON.stringify({
                text: text,
            })
        } , (data)=>{
            if(data.status!=="success"){
                setErrorMessage(data.message ? data.message : "Error while sending message");
            }
        })
    }


    return (
        <>
            <ChatList rooms={userRooms} loading={loadingRooms} user={user} onSelectRoom ={(index)=>{setSelectedRoomIdx(index)}} selectedRoomIdx={selectedRoomIdx}/>
            <ChatSpace room={userRooms[selectedRoomIdx]} loadingRooms={loadingRooms} loadingMessage={loadingNewMessage} user={user} onNewMessage={handleNewMessage} errorNewMessage={errorNewMessage}/>
        </>
    )
}

export default StatefulChat;