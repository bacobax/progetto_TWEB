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
