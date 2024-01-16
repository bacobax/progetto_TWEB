import {CiSearch} from "react-icons/ci";
import React from "react";
import {Kbd} from "@nextui-org/react";
interface FakeSearchBarProps{
    onClick: () => void;
}

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