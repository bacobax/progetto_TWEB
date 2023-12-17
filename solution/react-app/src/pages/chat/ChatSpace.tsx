import {FC} from "react";
import {Room} from "../../constants/types";
import {NewMessage} from "./NewMessage";
import Loading from "../../components/animations/Loading";
import {MessageList} from "./MessageList";

interface ChatSpaceProps {
    room: Room,
    user: { name: string; _id: string; email: string; token: string },
    loadingRooms: boolean,
    onNewMessage: (text: string) => void,
    loadingMessage: boolean,
    errorNewMessage: string | null
}
const ChatSpace:FC<ChatSpaceProps> = ({ user, room, loadingRooms, onNewMessage, loadingMessage, errorNewMessage }) => {

    const handleNewMessage = (text:string) => {
        onNewMessage(text);
    }

    if(loadingRooms) return <Loading />;

    if(!!room){
        return (
            <div className={"bg-gradient-to-r from-blue-black to-gray-900 w-full h-full flex flex-col"}>
                <MessageList messages={room.messages} userID={user._id} loadingMessage={loadingMessage} errorNewMessage={errorNewMessage}/>
                <NewMessage onNewMessage={handleNewMessage} />
            </div>
        );
    }else{
        return (
            <div className={"bg-gradient-to-r from-blue-black to-gray-900 w-full h-full flex flex-col items-center justify-center"}>
                <h1 className={"text-xl text-white font-extrabold"}>Welcome to the chat space</h1>
            </div>
        )
    }

};



export default ChatSpace;