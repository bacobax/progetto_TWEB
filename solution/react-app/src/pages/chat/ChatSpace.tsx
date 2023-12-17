import {FC} from "react";
import {Room} from "../../constants/types";
import {NewMessage} from "./NewMessage";
import Loading from "../../components/animations/Loading";
import {MessageList} from "./MessageList";
import { IoArrowBack } from "react-icons/io5";


interface ChatSpaceProps {
    room: Room,
    user: { name: string; _id: string; email: string; token: string },
    loadingRooms: boolean,
    onNewMessage: (text: string) => void,
    loadingMessage: boolean,
    errorNewMessage: string | null,
    isPhone: boolean,
    onBack: () => void,
    width: number
}
const ChatSpace:FC<ChatSpaceProps> = ({
                                          user,
                                          room,
                                          loadingRooms,
                                          onNewMessage,
                                          loadingMessage,
                                          errorNewMessage,

                                          onBack,
                                          width
                                      }) => {

    const handleNewMessage = (text:string) => {
        onNewMessage(text);
    }

    if(loadingRooms) return <Loading />;

    if(!!room){
        return (
            <div className={`bg-gradient-to-r from-blue-black to-gray-900 w-full  h-full flex flex-col md:w-[${width-400}] sm:w-3/5`}>
                <header className={"w-full h-1/6 flex items-center justify-center gap-[20px]"}>
                    <IoArrowBack className={"w-[40px] h-[40px] text-red-600 cursor-pointer sm:hidden hover:scale-110 duration-250"} onClick={onBack}/>
                    <h1 className={"text-xl text-white font-extrabold"}>{room.name}</h1>
                </header>
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