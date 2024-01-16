import {FC} from "react";
import Modal from "../../UI/modal/Modal";
import {Button} from "@nextui-org/react";
interface FetchErrorProps {
    opened:boolean;
    onClose:()=>void;
    message?:string;
}

export const FetchError:FC<FetchErrorProps> = ({opened, onClose , message}) => {


    return (
        <Modal opened={opened} onClose={onClose} title={"Log in Error"} classNames={{
            modal: "bg-gray-900 text-white",
            content: "flex flex-col items-center justify-center gap-4"

        }}>
            {!message ? <h1 className={"text-2xl text-red-500"}>💥 Ops, error fetching the resources, Try Later or Reload the
                page!</h1> : <h1 className={"text-2xl text-red-500"}>💥 Something went wrong: {message}</h1>}
            <Button className={"dark"} variant={"ghost"} color={"danger"} onClick={()=>{
                window.location.reload();
            }}>Reload the page</Button>
        </Modal>
    );
};
