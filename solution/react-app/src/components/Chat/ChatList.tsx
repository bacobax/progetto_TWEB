import {FC, useCallback} from "react";
import {Button, Skeleton, Tooltip} from '@nextui-org/react';
import ChatItem from "./ChatItem";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import {Room} from "./types";

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

/**
 * ChatList is a functional component in React.
 * It accepts props of type ChatListProps which includes:
 * - rooms: An array of Room objects representing the chat rooms.
 * - onSelectRoom: A function to be executed when a chat room is selected.
 * - loading: A boolean indicating whether the chat rooms are being loaded.
 * - user: An object representing the current user.
 * - selectedRoomIdx: The index of the currently selected chat room.
 * - isPhone: A boolean indicating whether the user is on a phone.
 * - onOpenNewChatForm: A function to be executed when the new chat form is opened.
 * - onOpenSearchChatForm: A function to be executed when the search chat form is opened.
 *
 * The component defines two functions using the useCallback hook:
 * - renderChats: This function returns a list of ChatItem components if there are chat rooms, or a div with a button to start a new conversation if there are no chat rooms.
 * - renderSkeletons: This function returns a list of skeleton components to be displayed while the chat rooms are being loaded.
 *
 * The component returns a div element styled with Tailwind CSS classes. The div includes:
 * - A header with the user's email and buttons to create a new chat and search chats.
 * - A div that displays the chat rooms using the renderChats function if they are not being loaded, or the skeleton components using the renderSkeletons function if they are being loaded.
 */
const   ChatList: FC<ChatListProps> = ({ rooms, onSelectRoom, loading, user, selectedRoomIdx, isPhone, onOpenNewChatForm , onOpenSearchChatForm}) => {


  const renderChats = useCallback(
    () =>
      rooms.length > 0 ? (
        rooms.map((room, index) => <ChatItem key={room._id} room={room} selected={index === selectedRoomIdx} onClick={()=>{
            onSelectRoom(index);
        }} />)
      ) : (
          <div className={"w-ful flex flex-col items-center gap-4"}>
              <p className={"text-gray-400 text-sm"}>No chats yet</p>
              <Button onClick={onOpenNewChatForm} className={"dark bg-secondary w-4/5 self-center"} >Start a new conversation</Button>
          </div>
      ),
    [rooms, selectedRoomIdx, onSelectRoom, onOpenNewChatForm]
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
        <div className="flex flex-row flex-wrap  items-center pl-[20px] pt-[20px] pr-[20px] gap-[20px]">
          <h1 className="text-white font-bold text-xl"> {user.email}</h1>
            <Tooltip content={"Create new Chat"} placement={"bottom"}>
                <Button isIconOnly className={"dark"} onClick={onOpenNewChatForm}>
                    <MdOutlineAddToPhotos className="text-primary cursor-pointer hover:scale-110 duration-250 text-2xl" />
                </Button>

            </Tooltip>
            <Tooltip content={"Search new Chat"} placement={"bottom"}>
                <Button isIconOnly className={"dark"}  onClick={onOpenSearchChatForm}>
                <FaSearch className="text-primary cursor-pointer hover:scale-110 duration-250 text-2xl"/>
                </Button>
            </Tooltip>

        </div>
        <div className="flex flex-row w-full h-[75px]  items-center pl-[40px] gap-[20px]">
          <h2 className=" text-xl font-bold text-corvette"> Messages</h2>
        </div>
      </header>
      <div className="flex flex-col">
        {!loading ? renderChats() : renderSkeletons()}
      </div>
    </div>
  );
};

export default ChatList;
