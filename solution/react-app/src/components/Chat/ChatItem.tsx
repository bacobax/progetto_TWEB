import {FC} from "react";
import {Avatar} from "@nextui-org/react";
import {Room} from "./types";
interface ChatPreviewProps {
    room: Room;
    selected: boolean;
    onClick: () => void;
}

const getRandomGradientColorTailwind = ():string => {
    const colors = [
        "from-[#F9D423] to-[#FF4E50]",
        "from-[#00B4DB] to-[#0083B0]",
        "from-[#FF416C] to-[#FF4B2B]",
        "from-[#FFA17F] to-[#00223E]",
        "from-[#FBD3E9] to-[#BB377D]",
        "from-[#F8B500] to-[#F9D423]",
        "from-[#F953C6] to-[#B91D73]",
        "from-[#00F260] to-[#0575E6]",
        "from-[#FAD961] to-[#F76B1C]",
        "from-[#00B4DB] to-[#0083B0]",
        "from-[#FF416C] to-[#FF4B2B]",
        "from-[#FFA17F] to-[#00223E]",
        "from-[#FBD3E9] to-[#BB377D]",
        "from-[#F8B500] to-[#F9D423]",
        "from-[#F953C6] to-[#B91D73]",
        "from-[#00F260] to-[#0575E6]",
        "from-[#FAD961] to-[#F76B1C]",
        "from-[#00B4DB] to-[#0083B0]",
        "from-[#FF416C] to-[#FF4B2B]",
        "from-[#FFA17F] to-[#00223E]",
        "from-[#FBD3E9] to-[#BB377D]",
        "from-[#F8B500] to-[#F9D423]",
        "from-[#F953C6] to-[#B91D73]",
        "from-[#00F260] to-[#0575E6]",
        "from-[#FAD961] to-[#F76B1C]",
        "from-[#00B4DB] to-[#0083B0]",
        "from-[#FF416C] to-[#FF4B2B]",
        "from-[#FFA17F] to-[#00223E]",
    ]
    return colors[Math.floor(Math.random() * colors.length)];
}



export const ChatItem:FC<ChatPreviewProps> = ({room,selected, onClick}) => {
    const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1]  : null;
    return (
        <div className={`flex flex-row w-full h-[75px] flex-wrap items-center justify-around gap-[20px] hover:bg-gray-900 cursor-pointer ${selected && "bg-gray-900"}`} onClick={onClick}>
            <Avatar name={room.name} size="lg" classNames={{
                base: `bg-gradient-to-tl ${getRandomGradientColorTailwind()} cursor-pointer shrink-0 grow-1`
            }}/>
            <div className="flex flex-col cursor-pointer flex-shrink grow-0 w-[60%]">
                <label className="text-white capitalize font-extrabold cursor-pointer">
                    {room.name}
                </label>
                <label className="text-gray-500 cursor-pointer truncate">
                    {lastMessage !== null && (lastMessage.from.name+": ")}
                    {lastMessage === null ? "No messages yet" : lastMessage.text}
                </label>
            </div>


        </div>
    );
};


export default ChatItem;
