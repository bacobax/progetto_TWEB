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
export const NewChat:FC<NewChatProps> = ({onClose, opened, onNewChat}) => {

    const [searchParams, setSearchParams] = useSearchParams();

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
