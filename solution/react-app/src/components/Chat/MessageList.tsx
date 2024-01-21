import {FC} from "react";
import {ScrollShadow} from "@nextui-org/react";

import {Message} from "./types";

interface MessageListProps {
    messages: Message[],
    userID: string,
    loadingMessage: boolean,
    errorNewMessage: string | null
}


/**
 * MessageList is a functional component in React.
 * It accepts props of type MessageListProps which includes:
 * - messages: An array of Message objects representing the messages in the chat room.
 * - userID: A string representing the ID of the current user.
 * - loadingMessage: A boolean indicating whether a new message is being sent.
 * - errorNewMessage: A string representing any error that occurred while sending a new message.
 *
 * The component returns a ScrollShadow component from the @nextui-org/react library. This component provides a scrollable area with a shadow effect.
 * The ScrollShadow component is styled with Tailwind CSS classes and contains a list of messages.
 *
 * Each message is displayed in a div element. The div is aligned to the end if the message is from the current user, or to the start if the message is from another user.
 * The div includes two labels displaying the sender's name and the message text. The labels are styled with Tailwind CSS classes and the message text is displayed in a rounded box with a background color depending on the sender.
 *
 * If the message is the last one in the list and a new message is being sent, a label with the text "Sending message..." is displayed.
 * If the message is the last one in the list and there was an error sending a new message, a label with the text "ERROR SENDING MESSAGE" is displayed.
 */
export const MessageList: FC<MessageListProps> = ({ messages, userID, loadingMessage, errorNewMessage }) => {
    return (
        <ScrollShadow orientation={"vertical"} className={"h-5/6 w-full flex flex-col p-[30px] gap-[10px] overflow-scroll"}>
            {messages.length > 0 && messages.map((message, index) => {
                const itsMe = message.from._id === userID;
                const isLast = index === messages.length - 1;
                return (
                    <div className={`flex flex-col ${itsMe ? "self-end" : "self-start"} gap-2 max-w-[50%]`} key={index}>
                        <label className={`text-gray-400 ${itsMe ? "self-end" : "self-start"} text-sm`}>{itsMe ? "Me" : message.from.name}</label>
                        <label  className={`break-words rounded-2xl ${itsMe ? "bg-blue-500" : "bg-gray-500"} p-2 text-white`}>
                            {message.text}
                        </label>
                        {isLast && loadingMessage && <label className={"text-gray-400 self-end text-sm"}>Sending message...</label>}
                        {isLast && !loadingMessage && errorNewMessage && <label className={"text-red-500 self-end text-sm"}>ERROR SENDING MESSAGE</label>}
                    </div>
                )
            })}

        </ScrollShadow>
    );
};
