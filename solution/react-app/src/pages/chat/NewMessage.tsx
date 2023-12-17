import {Input} from "@nextui-org/react";
import {IoSend} from "react-icons/io5";
import React, {FC, useState} from "react";

interface NewMessageProps {
    onNewMessage: (text:string) => void;

}
export const NewMessage:FC<NewMessageProps> = ({onNewMessage}) => {
    const [text, setText] = useState("");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewMessage(text);
    }

    return (
        <form className={"h-1/6 w-full flex flex-col justify-center items-center mt-0"} onSubmit={handleSubmit}>
            <Input
                value={text}
                onChange={(e)=>{setText(e.target.value)}}
                endContent={
                <button className={"rounded-full w-[45px] h-[45px] flex justify-center items-center bg-gradient-to-tr from-blue-500 to-blue-600 cursor-pointer"} type={"submit"}>
                    <IoSend className={"text-white w-[25px] h-[25px]"}/>
                </button>
            } classNames={{
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",

                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "dark",
                    "w-4/5",
                    "bg-transparent",
                    "border-[1px] border-gray-rgba",
                    "p-2"

                ],
                mainWrapper: "flex justify-center items-center w-full h-full bg-transparent",
                base: "bg-transparent",


            }}/>

        </form>
    );
};
