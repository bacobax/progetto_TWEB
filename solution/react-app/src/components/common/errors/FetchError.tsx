import {FC} from "react";
import Modal from "../../UI/modal/Modal";
import {Button} from "@nextui-org/react";
interface FetchErrorProps {
    opened:boolean;
    onClose:()=>void;
    message?:string;
}

/**
 * FetchError is a functional component in React.
 * It accepts props of type FetchErrorProps which includes:
 * - opened: A boolean indicating whether the modal is open.
 * - onClose: A function to be executed when the modal is closed.
 * - message: A string representing a custom error message.
 *
 * The component returns a Modal component from the @nextui-org/react library. The Modal includes:
 * - A h1 element displaying the error message. If a custom message is provided, it is displayed. Otherwise, a default error message is displayed.
 * - A Button component that reloads the page when clicked. The button is styled with CSS classes from the @nextui-org/react library.
 */
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