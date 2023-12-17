import React, {FC} from "react";
import {Button, Input} from "@nextui-org/react";
import Modal from "../../components/UI/modal/Modal";
import {useForm} from "../../hooks/useForm";
import { IoAddCircle } from "react-icons/io5";

interface NewChatProps {
    onClose: () => void;
    opened: boolean;
    onNewChat: (name: string) => void;
}
export const NewChat:FC<NewChatProps> = ({onClose, opened, onNewChat}) => {
    const {formState, handleInputChange} = useForm({
        roomName : {
            value: "",
            error: true,
            validate: (value) => value.trim().length > 0,
            errorText: "Please insert a valid name"
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
        onNewChat(formState.roomName.value);
    }
    return (
        <Modal onClose={onClose} title={"New Chat - Insert The Name"} opened={opened} classNames={{
            modal: "bg-gray-800 text-white",
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
                       endContent={<Button isIconOnly={true} type={"submit"}><IoAddCircle className={"w-full h-full text-blue-400"}/></Button>}
                />
            </form>
        </Modal>
    );
};
