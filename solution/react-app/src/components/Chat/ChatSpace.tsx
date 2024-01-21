import {FC, useEffect, useState} from "react";
import {NewMessage} from "./NewMessage";
import Loading from "../animations/Loading";
import {MessageList} from "./MessageList";
import { IoArrowBack } from "react-icons/io5";
import { BiExit } from "react-icons/bi";
import {Button, Tooltip} from "@nextui-org/react";
import {socket} from "../../socket";
import {Room} from "./types";

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
/**
 * ChatSpace is a functional component in React.
 * It accepts props of type ChatSpaceProps which includes:
 * - user: An object representing the current user.
 * - room: An object of type Room representing the current chat room.
 * - loadingRooms: A boolean indicating whether the chat rooms are being loaded.
 * - onNewMessage: A function to be executed when a new message is sent.
 * - loadingMessage: A boolean indicating whether a new message is being sent.
 * - errorNewMessage: A string representing any error that occurred while sending a new message.
 * - onLeaveRoom: A function to be executed when the user leaves the room.
 * - onBack: A function to be executed when the user navigates back.
 * - width: The width of the chat space.
 *
 * The component maintains a state variable popup, which is used to display notifications when a user joins or leaves the room.
 *
 * The useEffect hook is used to listen for "leave" and "firstJoin" events from the socket. When these events occur, the popup state is updated with the relevant information.
 *
 * The handleNewMessage function is a wrapper around the onNewMessage prop. It is used to send a new message.
 *
 * The component returns a Loading component if the chat rooms are being loaded.
 * If a room is selected, it returns a div element with the chat space, including a header with the room name and leave button, a MessageList component displaying the messages, and a NewMessage component for sending new messages.
 * If no room is selected, it returns a div element with a welcome message.
 */
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
            setPopup({
                content:`${userID} has left the room`, type: "LEAVE"
            });
            setTimeout(() => {
                setPopup(null);
            }, 5000);
        });
        socket.on("firstJoin" , (roomID: string, userID: string) => {
            if(userID === user._id) return;
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
    }, [user._id]);
    const handleNewMessage = (text:string) => {
        onNewMessage(text);
    }

    if(loadingRooms) return <Loading />;

    if(!!room){
        return (
            <div className={`bg-gradient-to-r from-blue-black to-gray-900 max-h-full w-full   flex flex-col md:w-[${width-400}] sm:w-3/5`}>
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