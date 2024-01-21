import {CiSearch} from "react-icons/ci";
import React from "react";
import {Kbd} from "@nextui-org/react";
interface FakeSearchBarProps{
    onClick: () => void;
}

/**
 * FakeSearchBar is a functional component in React.
 * It accepts props of type FakeSearchBarProps which includes:
 * - onClick: A function to be executed when the component is clicked.
 *
 * The component returns a div element styled with Tailwind CSS classes. The div includes:
 * - A CiSearch icon from the react-icons library.
 * - A label element with the text "Search Everything...".
 * - A Kbd component from the @nextui-org/react library displaying the "command" key.
 *
 * The onClick prop is attached to the div, triggering the provided function when the component is clicked.
 */
const FakeSearchBar: React.FC<FakeSearchBarProps> = ({onClick}) => {
    return (
        <div className={"flex justify-center items-center w-4/5 bg-searchbar text-white py-[12px] px-[9px] rounded-lg gap-[10px] cursor-pointer overflow-hidden"} onClick={onClick}>
            <CiSearch className={"text-2xl"}/>
            <label className={"text-gray-200 truncate cursor-pointer"}>Search Everything...</label>
            <Kbd keys={["command"]} className="dark">K</Kbd>
        </div>
    )
}

export default  FakeSearchBar;