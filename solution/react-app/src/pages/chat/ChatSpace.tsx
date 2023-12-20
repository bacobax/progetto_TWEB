import {FC, useEffect, useState} from "react";
import {Room} from "../../constants/types";
import {NewMessage} from "./NewMessage";
import Loading from "../../components/animations/Loading";
import {MessageList} from "./MessageList";
import { IoArrowBack } from "react-icons/io5";
import { BiExit } from "react-icons/bi";
import {Button, Tooltip} from "@nextui-org/react";
import {socket} from "../../socket";

interface ChatSpaceProps {
    room: Room,
    user: { name: string; _id: string; email: string; token: string },
    loadingRooms: boolean,
    onNewMessage: (text: string) => void,
    loadingMessage: boolean,
    errorNewMessage: string | null,
    isPhone: boolean,
    onBack: () => void,
    width: number,
    onLeaveRoom: () => void
}

type Popup = {
    type: "JOIN" | "LEAVE",
    content: string
} | null;
const ChatSpace:FC<ChatSpaceProps> = ({
                                          user,
                                          room,
                                          loadingRooms,
                                          onNewMessage,
                                          loadingMessage,
                                          errorNewMessage,
                                          onLeaveRoom,
                                          onBack,
                                          width
                                      }) => {

    const [popup, setPopup] = useState<Popup>(null);

    useEffect(() => {
        socket.connect();
        socket.on("leave" , (roomID: string, userID: string) => {
            console.log("LEAVE RECEIVED")
            setPopup({
                content:`${userID} has left the room`, type: "LEAVE"
            });
            setTimeout(() => {
                setPopup(null);
            }, 5000);
        });
        socket.on("first-join" , (roomID: string, userID: string) => {
            if(userID === user._id) return;
            console.log("CREATE OR JOIN RECEIVED")
            setPopup({
                content: `${userID} has joined the room`,
                type: "JOIN"
            });
            setTimeout(() => {
                setPopup(null);
            }, 5000);
        });
        return () => {
            socket.off("leave");
        }
    }, []);
    const handleNewMessage = (text:string) => {
        onNewMessage(text);
    }

    if(loadingRooms) return <Loading />;

    if(!!room){
        return (
            <div className={`bg-gradient-to-r from-blue-black to-gray-900 w-full  h-full flex flex-col md:w-[${width-400}] sm:w-3/5`}>
                {!!popup &&
                    <div className={"fixed top-3 right-3 rounded-xl bg-blue-300/50 backdrop-blur text-black flex justify-center items-center p-[20px] z-20"}>
                        <h1 className={`font-bold ${popup.type === "LEAVE" ? "text-red-400" : "text-green-300"}`}>{popup.content}</h1>
                    </div>
                }
                <header className={"w-full h-1/6 flex items-center justify-center gap-[20px]"}>
                    <IoArrowBack className={"w-[40px] h-[40px] text-violet-300 cursor-pointer sm:hidden hover:scale-110 duration-250"} onClick={onBack}/>
                    <h1 className={"text-xl text-white font-extrabold"}>{room.name}</h1>
                    <Tooltip content={"Leave the room"} showArrow>
                        <Button isIconOnly className={"dark"}>
                            <BiExit className={"w-[30px] h-[30px] text-red-600 cursor-pointer hover:scale-110 duration-250"} onClick={onLeaveRoom}/>
                        </Button>
                    </Tooltip>

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