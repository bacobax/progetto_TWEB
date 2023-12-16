import {FC, useEffect, useState} from "react";
import {getUserInfo} from "../../auth/authFunctions";
import {Room} from "../../constants/types";
import useFetch from "../../hooks/useFetch";
import {URL_ROOM_FROM_USER} from "../../constants/constants";
import ChatList from "./ChatList";
import {Navigate} from "react-router-dom";

interface StatefulChatProps {

}

const StatefulChat: FC<StatefulChatProps> = () => {

    const [userRooms, setUserRooms] = useState<Room[]>([]);
    const [selectedRoomIdx, setSelectedRoomIdx] = useState<number>(0);
    const {loading, error, setError, fetchData} = useFetch();
    const [user, setUser] = useState(getUserInfo());


    useEffect(() => {
        if(!user){
            setError("Not logged in");
            return;
        }else{
            fetchData<{status:string, data: Room[], message?:string}>({url:URL_ROOM_FROM_USER(user._id) , token: user.token}, (data)=>{
                if(data.status==="success"){
                    setUserRooms(data.data);
                }else{
                    setError(data.message?data.message:"");
                }
            })
        }
    }, [fetchData, setError, user]);

    if(!user){
        return <Navigate to={'/auth'} />;
    }

    if(!loading && error){
        return (
            <div style={{
                display:"flex" ,
                alignItems:"center" ,
                justifyContent: "center" ,
                width: "100vw" ,
                height: "100vh"
            }}>
                <h1 className="text-white"> Error retrieving chat information: {error} </h1>
            </div>)
    }


    return (
        <>
            <ChatList rooms={userRooms} loading={loading} user={user}/>
        </>
    )
}

export default StatefulChat;