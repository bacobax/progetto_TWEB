import React from "react";

export interface NavbarElement {
    name: string;
    path: string;
    icon: React.ReactNode;
    onClick?: () => void;
    routerLink: boolean;
}

export type Elements = NavbarElement[];