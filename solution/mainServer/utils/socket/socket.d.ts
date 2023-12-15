import {Server} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

declare module "socket.io"{
    export function init(io: Server<DefaultEventsMap, DefaultEventsMap, any>):void;
    export function initChat(io: Server<DefaultEventsMap, DefaultEventsMap, any>):void;
}