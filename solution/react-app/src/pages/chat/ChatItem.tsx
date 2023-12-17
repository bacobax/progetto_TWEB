import {FC} from "react";
import {Room} from "../../constants/types";
import {Avatar} from "@nextui-org/react";
interface ChatPreviewProps {
    room: Room;
    selected: boolean;
    onClick: () => void;
}

const getRandomGradientColorTailwind = ():string => {
    const colors = [
        "from-orange-800 to-orange-900",
        "from-pink-800 to-pink-900",
        "from-purple-800 to-purple-900",
        "from-blue-800 to-blue-900",
        "from-green-800 to-green-900",
        "from-yellow-800 to-yellow-900",
        "from-red-800 to-red-900",
        "from-indigo-800 to-indigo-900",
        "from-gray-800 to-gray-900",
        "from-stone-800 to-stone-900",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}


const SELECT_COLOR = "bg-stone-800";

export const ChatItem:FC<ChatPreviewProps> = ({room,selected, onClick}) => {
    const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1]  : null;
    return (
        <div className={`flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px] hover:${SELECT_COLOR} cursor-pointer ${selected && SELECT_COLOR}`} onClick={onClick}>
            <Avatar name={room.name} size="lg" classNames={{
                base: `bg-gradient-to-tl ${getRandomGradientColorTailwind()} cursor-pointer`
            }}/>
            <div className="flex flex-col cursor-pointer">
                <label className="text-white capitalize font-extrabold cursor-pointer">
                    {room.name}
                </label>
                <label className="text-gray-500 cursor-pointer">
                    {lastMessage !== null && lastMessage.from.name}:  {"  "}
                    {lastMessage === null ? "No messages yet" : lastMessage.text}
                </label>
            </div>


        </div>
    );
};


export default ChatItem;
