import React from "react";

interface NavbarElement {
    name: string;
    path: string;
    icon: React.ReactNode;
    onClick?: () => void;
}

export type Elements = NavbarElement[];