import {FC} from "react";
import Modal from "../../UI/modal/Modal";
import {Button, Link} from "@nextui-org/react";
type ErrType = "JWTEXPIRED" | "JWTINVALID" | "JWTMISSING" | "INVALIDCREDENTIALS";
type AuthErrorProps = {
    opened:boolean;
    onClose:()=>void;
    type?: ErrType;
    message?: string;
}
const mapMessage:{[key:string] : string} = {
    "JWTEXPIRED" : "Ops, Your token is expired. Sign in again and get the access!",
    "JWTINVALID" : "Ops, Your token is invalid. Sign in again and get the access!",
    "JWTMISSING" : "Ops, Your token is missing. Sign in again and get the access!",
    "INVALIDCREDENTIALS" : "Ops, Your credentials are invalid. Sign in again and get the access!",
}
/**
 * AuthError is a functional component in React.
 * It accepts props of type AuthErrorProps which includes:
 * - opened: A boolean indicating whether the modal is open.
 * - onClose: A function to be executed when the modal is closed.
 * - type: A string representing the type of the error. It can be one of the following: "JWTEXPIRED", "JWTINVALID", "JWTMISSING", "INVALIDCREDENTIALS".
 * - message: A string representing a custom error message.
 *
 * The component uses a mapMessage object to map the error types to error messages.
 *
 * The component returns a Modal component from the @nextui-org/react library. The Modal includes:
 * - A h1 element displaying the error message. If a custom message is provided, it is displayed. Otherwise, the message corresponding to the error type from the mapMessage object is displayed.
 * - A Button component with a Link component inside. The Link component navigates to the "/auth" route when clicked.
 */
export const AuthError:FC<AuthErrorProps> = ({opened, onClose,type, message}) => {

    return (
        <Modal opened={opened} onClose={onClose} title={"Log in Error"} classNames={{
            modal: "bg-gray-900 text-white",
            content: "flex flex-col items-center justify-center gap-4"

        }}>
            {!message && <h1 className={"text-2xl text-red-500"}>💥{!!type && mapMessage[type]}</h1>}
            {!!message && <h1 className={"text-2xl text-red-500"}>💥{message}</h1>}
            <Button className={"dark"} variant={"ghost"} color={"default"}><Link href={"/auth"}>Go to Log In</Link></Button>
        </Modal>
    );
};