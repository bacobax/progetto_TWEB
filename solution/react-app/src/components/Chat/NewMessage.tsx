import {Input} from "@nextui-org/react";
import {IoSend} from "react-icons/io5";
import React, {FC, useState} from "react";

interface NewMessageProps {
    onNewMessage: (text:string) => void;

}
/**
 * NewMessage is a functional component in React.
 * It accepts props of type NewMessageProps which includes:
 * - onNewMessage: A function to be executed when a new message is sent.
 *
 * The component maintains a state variable text, which is the text of the new message.
 *
 * The handleSubmit function is a handler for the form submission event. It prevents the default form submission behavior and calls the onNewMessage prop with the text from the state.
 *
 * The component returns a form element styled with Tailwind CSS classes. The form includes an Input component from the @nextui-org/react library for entering the new message.
 * The Input component is a controlled component, with its value and onChange props tied to the text state.
 * The Input component also includes a submit button with an icon, wrapped in a button element. The button is styled with Tailwind CSS classes and triggers the form submission when clicked.
 */
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
