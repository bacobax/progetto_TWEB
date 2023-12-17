import {FC} from "react";
import {Chip, ScrollShadow} from "@nextui-org/react";
import {Message} from "../../constants/types";

interface MessageListProps {
    messages: Message[],
    userID: string,
    loadingMessage: boolean,
    errorNewMessage: string | null
}


export const MessageList: FC<MessageListProps> = ({ messages, userID, loadingMessage, errorNewMessage }) => {
    return (
        <ScrollShadow orientation={"vertical"} className={"h-4/6 w-full flex flex-col p-[30px] gap-[10px] overflow-scroll"}>
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
