import React, {FC, useEffect} from "react";
import {Button, Input, Textarea, Tooltip} from "@nextui-org/react";
import Modal from "../UI/modal/Modal";
import {useForm} from "../../hooks/useForm";
import { IoAddCircle } from "react-icons/io5";
import {useSearchParams} from "react-router-dom";

interface NewChatProps {
    onClose: () => void;
    opened: boolean;
    onNewChat: (name: string, description:string) => void;
}
/**
 * NewChat is a functional component in React.
 * It accepts props of type NewChatProps which includes:
 * - onClose: A function to be executed when the modal is closed.
 * - opened: A boolean indicating whether the modal is open.
 * - onNewChat: A function to be executed when a new chat is created.
 *
 * The component uses the useSearchParams hook from the react-router-dom library to get the search parameters from the URL.
 * The player search parameter is retrieved and stored in the player constant.
 *
 * The useForm custom hook is used to manage the form state. The form state includes the room name and description, each with a value, error, validation function, and error text.
 *
 * The useEffect hook is used to update the form state with the player name and a default discussion description when the player search parameter changes.
 *
 * The handleSubmit function is a handler for the form submission event. It prevents the default form submission behavior and calls the onNewChat prop with the room name and description from the form state.
 *
 * The component returns a Modal component from the @nextui-org/react library. The Modal includes a form with an Input for the room name and a Textarea for the description.
 * The Input and Textarea are controlled components, with their values and onChange props tied to the form state.
 * The form also includes a submit button with an icon, wrapped in a Tooltip for additional information.
 */
export const NewChat:FC<NewChatProps> = ({onClose, opened, onNewChat}) => {

    const [searchParams, ] = useSearchParams();

    const player = searchParams.get("player");

    const {formState, handleInputChange} = useForm({
        roomName : {
            value: "",
            error: true,
            validate: (value) => value.trim().length > 0,
            errorText: "Please insert a valid name"
        },
        description: {
            value: "",
            error: false,
            validate: (value) => value.trim().length > 0,
            errorText: "Please insert a valid description"
        }
    })

    useEffect(() => {
        if(player){
            handleInputChange({
                value: `${player} Discussion`,
                inputName: "roomName"
            });
            handleInputChange({
                value: `Discussion about ${player} Description`,
                inputName: "description"
            });
        }
    }, [handleInputChange, player]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewChat(formState.roomName.value, formState.description.value);
    }
    return (
        <Modal onClose={onClose} title={"New Chat - Insert The Name"} opened={opened} classNames={{
            modal: "bg-gray-900 text-white",
            content: "mt-4"
        }}>
            <form onSubmit={handleSubmit}>
                <Input size={"md"} type="text" label="Name Of The Chat" className={"dark"} value={formState.roomName.value}
                    onChange={(e)=>{
                        handleInputChange({
                            value: e.target.value,
                            inputName: "roomName"
                        });
                    }}
                       errorMessage={formState.roomName.errorText}
                       isInvalid={formState.roomName.error}
                       endContent={<Tooltip className={"dark text-white"} content={"Create New room"}><Button isIconOnly={true} type={"submit"}><IoAddCircle className={"w-full h-full text-blue-400"}/></Button></Tooltip>}
                />
                <Textarea label={"Room description"} className={"dark"} onChange={(e)=>{
                    handleInputChange({
                        value: e.target.value,
                        inputName: "description"
                    });
                }} value={formState.description.value}/>
            </form>
        </Modal>
    );
};