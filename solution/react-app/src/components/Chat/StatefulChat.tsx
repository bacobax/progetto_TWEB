import { FC} from "react";

import ChatList from "./ChatList";
import ChatSpace from "./ChatSpace";
import {NewChat} from "./NewChat";
import useStatefulChat from "./StatefulChat.hook";
import useWindowSize from "../../hooks/useWindowSize";

import {SearchChat} from "./SearchChat";
import {FetchError} from "../common/errors/FetchError";
import {AuthError} from "../common/errors/AuthError";
//import ErrorMessage from "./ErrorMessage"; // Assuming ErrorMessage is a new component for displaying errors

interface StatefulChatProps {}

/**
 * SearchChat is a functional component in React.
 * It accepts props of type SearchChatProps which includes:
 * - onClose: A function to be executed when the modal is closed.
 * - opened: A boolean indicating whether the modal is open.
 * - onSelectRoom: A function to be executed when a chat room is selected.
 *
 * The component uses the useSearch custom hook to manage the search functionality. The hook returns an object with the following properties:
 * - setSearchTerm: A function to set the search term.
 * - data: An array of Room objects representing the search results.
 * - searchTerm: The current search term.
 * - loading: A boolean indicating whether the search is in progress.
 * - setData: A function to set the search results.
 *
 * The component maintains a state variable selectedRoomIdx, which is the index of the currently selected room in the search results.
 *
 * The handleSubmit function is a handler for the form submission event. It prevents the default form submission behavior.
 *
 * The onJoinPressed function is a handler for the join button click event. It calls the onSelectRoom prop with the ID of the currently selected room.
 *
 * The handleSearchTermChange function is a handler for the search term input change event. It sets the search term to the value of the input.
 *
 * The handleClose function is a handler for the modal close event. It resets the search term, search results, and selected room index, and calls the onClose prop.
 *
 * The component returns a Modal component from the @nextui-org/react library. The Modal includes a form with an Input for the search term and a list of search results.
 * Each search result is displayed in a div element with the room name and a join button. The div is styled with Tailwind CSS classes and changes its background color when it is selected.
 * If a room is selected, the Modal also includes a Textarea displaying the room description and a confirmation message and buttons for joining the room or cancelling the selection.
 */
const StatefulChat: FC<StatefulChatProps> = () => {
    const {
        userRooms,
        selectedRoomIdx,
        user,
        isChatList,
        setIsChatList,
        closeNewChatModal,
        openNewChatModal,
        isNewChatModalOpen,
        loadingRooms,
        errorRooms,
        loadingNewMessage,
        errorNewMessage,
        handleNewMessage,
        handleSelectRoom,
        handleNewChat,
        handleSelectRoomToJoin,
        openSearchChatModal,
        isSeaerchChatModalOpen,
        closeSearchChatModal,
        handleLeaveRoom
    } = useStatefulChat();

    const {width} = useWindowSize();
    const isPhone = width < 640;


    if (!user) {
        return <AuthError onClose={()=>{}} type={"JWTMISSING"} opened={true}/>;
    }

    if (!loadingRooms && errorRooms) {
        return (
            <FetchError opened={!!errorRooms} onClose={()=>{
            }} message={errorRooms}/>
        );
    }
    return (
        <div className={"flex w-full h-full"}>
            {((isPhone && isChatList) || !isPhone) &&
                <ChatList
                    rooms={userRooms}
                    loading={loadingRooms}
                    user={user}
                    onSelectRoom={handleSelectRoom}
                    selectedRoomIdx={selectedRoomIdx}
                    isPhone={isPhone}
                    onOpenNewChatForm={openNewChatModal}
                    onOpenSearchChatForm={openSearchChatModal}
                />
            }
            {((isPhone && !isChatList) || !isPhone) &&
                <ChatSpace room={userRooms[selectedRoomIdx]}
                           loadingRooms={loadingRooms}
                           loadingMessage={loadingNewMessage}
                           user={user}
                           onNewMessage={handleNewMessage}
                           errorNewMessage={errorNewMessage}
                           isPhone={isPhone} onBack={() => { setIsChatList(true) }}
                           width={width}
                           onLeaveRoom={() => { handleLeaveRoom(userRooms[selectedRoomIdx]._id) }}

                />
            }
            <NewChat onClose={closeNewChatModal} opened={isNewChatModalOpen} onNewChat={handleNewChat}/>
            <SearchChat onClose={closeSearchChatModal} opened={isSeaerchChatModalOpen} onSelectRoom={handleSelectRoomToJoin}/>

        </div>
    );
};

export default StatefulChat;
