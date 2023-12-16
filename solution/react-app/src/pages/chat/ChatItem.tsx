import {FC} from "react";
import {Room} from "../../constants/types";
import {Avatar} from "@nextui-org/react";
interface ChatPreviewProps {
    room: Room;
}
export const ChatItem:FC<ChatPreviewProps> = ({room}) => {
    const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1].text  : "No messages yet";
    return (
        <div className="flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px] hover:bg-stone-800 cursor-pointer">
            <Avatar name={room.name} size="lg" classNames={{
                base: 'bg-gradient-to-tl from-orange-800 to-orange-900 cursor-pointer'
            }}/>
            <div className="flex flex-col cursor-pointer">
                <label className="text-white capitalize font-extrabold cursor-pointer">
                    {room.name}
                </label>
                <label className="text-gray-500 cursor-pointer">
                    {lastMessage}
                </label>
            </div>


        </div>
    );
};


export default ChatItem;
