import {Room} from "../../constants/types";
import {FC, useCallback} from "react";
import {Button, Skeleton, Tooltip} from '@nextui-org/react';
import ChatItem from "./ChatItem";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

interface ChatListProps {
    rooms: Room[],
    loading: boolean,
    onSelectRoom: (id: number) => void,
    user: {
        _id: string;
        email: string;
        token: string;
        name: string;
    },
    selectedRoomIdx: number,
    isPhone: boolean,
    onOpenNewChatForm: () => void
    onOpenSearchChatForm: () => void
}

const   ChatList: FC<ChatListProps> = ({ rooms, onSelectRoom, loading, user, selectedRoomIdx, isPhone, onOpenNewChatForm , onOpenSearchChatForm}) => {


  const renderChats = useCallback(
    () =>
      rooms.length > 0 && (
        rooms.map((room, index) => <ChatItem key={room._id} room={room} selected={index === selectedRoomIdx} onClick={()=>{
            onSelectRoom(index);
        }} />)
      ),
    [rooms, selectedRoomIdx, onSelectRoom]
  );

  const renderSkeletons = useCallback(() => {
    return Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px] hover:bg-stone-800 cursor-pointer"
      >
        <Skeleton />
        <div className="flex flex-col cursor-pointer">
          <Skeleton />
          <Skeleton />
        </div>
      </div>
    ));
  }, []);

  return (
    <div className="w-full sm:w-2/5 h-full border-r-[0.5px] border-gray-rgba">
      <header>
        <div className="flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px]">
          <h1 className="text-white font-bold text-xl"> {user.email}</h1>
            <Tooltip content={"Create new chat"} placement={"bottom"} showArrow>
                <Button isIconOnly className={"dark"} onClick={onOpenNewChatForm}>
                    <MdOutlineAddToPhotos className="text-primary cursor-pointer hover:scale-110 duration-250 text-2xl" />
                </Button>

            </Tooltip>
            <Tooltip content={"Search new chat"} placement={"bottom"} showArrow>
                <Button isIconOnly className={"dark"}  onClick={onOpenSearchChatForm}>
                <FaSearch className="text-primary cursor-pointer hover:scale-110 duration-250 text-2xl"/>
                </Button>
            </Tooltip>

        </div>
        <div className="flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px]">
          <h2 className="text-white text-l"> Messages</h2>
        </div>
      </header>
      <div className="flex flex-col">
        {!loading ? renderChats() : renderSkeletons()}
      </div>
    </div>
  );
};

export default ChatList;
