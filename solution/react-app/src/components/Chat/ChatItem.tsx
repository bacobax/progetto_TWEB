import {FC, useState} from "react";
import {Avatar} from "@nextui-org/react";
import {Room} from "./types";
interface ChatPreviewProps {
    room: Room;
    selected: boolean;
    onClick: () => void;
}

const getRandomGradientColorTailwind = ():string => {
    const colors = [
        "from-[#37474F] to-[#263238]", // Deep blue-grey gradient
        "from-[#607D8B] to-[#455A64]", // Indigo blue-grey gradient
        "from-[#FF7043] to-[#BF360C]", // Deep orange gradient
        "from-[#6A1B9A] to-[#4A148C]", // Dark purple gradient
        "from-[#1565C0] to-[#0D47A1]", // Strong blue gradient
        "from-[#2E7D32] to-[#1B5E20]", // Forest green gradient
        "from-[#EF6C00] to-[#E65100]", // Dark orange gradient
        "from-[#5D4037] to-[#3E2723]", // Brown gradient
        "from-[#C2185B] to-[#880E4F]", // Deep pink gradient
        "from-[#7B1FA2] to-[#4A148C]", // Purple gradient
        "from-[#1976D2] to-[#0D47A1]", // Royal blue gradient
        "from-[#C62828] to-[#B71C1C]", // Dark red gradient
        "from-[#0288D1] to-[#01579B]", // Cobalt blue gradient
        "from-[#00796B] to-[#004D40]", // Teal gradient
        "from-[#6D4C41] to-[#3E2723]", // Dark brown gradient
        // ... add more as desired
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}



/**
 * ChatItem is a functional component in React.
 * It accepts props of type ChatPreviewProps which includes:
 * - room: An object of type Room which includes the details of the chat room.
 * - selected: A boolean indicating whether the chat room is currently selected.
 * - onClick: A function to be executed when the chat item is clicked.
 *
 * The component maintains a state variable gradientColor, which is initialized with a random gradient color.
 * The gradient color is generated using the getRandomGradientColorTailwind function.
 *
 * The lastMessage constant is determined based on the messages in the room. If there are messages, it is set to the last message, otherwise, it is set to null.
 *
 * The component returns a div element styled with Tailwind CSS classes. The div includes:
 * - An Avatar component displaying the name of the room.
 * - A div containing two labels displaying the name of the room and the last message or a placeholder text if there are no messages.
 *
 * The Avatar and the div are wrapped in a parent div which changes its background color when hovered or when the chat room is selected.
 * The onClick prop is attached to the parent div, triggering the provided function when the chat item is clicked.
 */
export const ChatItem:FC<ChatPreviewProps> = ({room,selected, onClick}) => {
    const [gradientColor, ] = useState(getRandomGradientColorTailwind());

    const lastMessage = room.messages.length > 0 ? room.messages[room.messages.length - 1]  : null;
    return (
        <div className={`flex flex-row w-full h-[75px] flex-wrap items-center justify-around gap-[20px] hover:bg-gray-900 cursor-pointer ${selected && "bg-gray-900"}`} onClick={onClick}>
            <Avatar name={room.name} size="lg" classNames={{
                base: `bg-gradient-to-tl ${gradientColor} cursor-pointer shrink-0 grow-1`
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
