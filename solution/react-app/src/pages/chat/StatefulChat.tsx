import { FC} from "react";

import ChatList from "./ChatList";
import { Navigate } from "react-router-dom";
import ChatSpace from "./ChatSpace";
import {NewChat} from "./NewChat";
import useStatefulChat from "./StatefulChat.hook";
import useWindowSize from "../../hooks/useWindowSize";

import {SearchChat} from "./SearchChat";
//import ErrorMessage from "./ErrorMessage"; // Assuming ErrorMessage is a new component for displaying errors

interface StatefulChatProps {}


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
        return <Navigate to={'/auth'} />;
    }

    if (!loadingRooms && errorRooms) {
        return (
            <div className={"text-white"}>
                <h1>ERROR LOADING ROOMS</h1>
                <h2>{errorRooms}</h2>
            </div>
        );
    }



    return (
        <>
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
                           user={user} onNewMessage={handleNewMessage}
                           errorNewMessage={errorNewMessage}
                           isPhone={isPhone} onBack={() => { setIsChatList(true) }}
                           width={width}
                           onLeaveRoom={() => { handleLeaveRoom(userRooms[selectedRoomIdx]._id) }}

                />
            }
            <NewChat onClose={closeNewChatModal} opened={isNewChatModalOpen} onNewChat={handleNewChat}/>
            <SearchChat onClose={closeSearchChatModal} opened={isSeaerchChatModalOpen} onSelectRoom={handleSelectRoomToJoin}/>
        </>
    );
};

export default StatefulChat;
