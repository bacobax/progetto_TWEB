import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import {FC} from "react";

interface DropdownButtonProps {
    onAction : ((key:string|number) => void) | undefined;
}

const DropdownButton:FC<DropdownButtonProps> = ({onAction}) => {

    return (

        <Dropdown backdrop="blur">
        <DropdownTrigger>
            <Button
                variant="bordered"
            >
                Open Menu
            </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Static Actions" onAction={onAction}>
            <DropdownItem key="new">New file</DropdownItem>
            <DropdownItem key="copy">Copy link</DropdownItem>
            <DropdownItem key="edit">Edit file</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
                Delete file
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>)
}
export default DropdownButton;