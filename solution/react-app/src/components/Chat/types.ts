export interface Message {
    from: {
        _id: string;
        id: string;
        name: string;
    };
    text: string;
    id?: string;
}

export interface Room {
    name: string;
    _id: string;
    admin: string;
    members: string[];
    messages: Message[];
    description?: string;
}