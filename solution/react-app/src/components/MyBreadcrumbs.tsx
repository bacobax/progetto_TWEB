import React, {FC} from "react";
import {BreadcrumbItem, Breadcrumbs} from "@nextui-org/react";
interface MyBreadcrumbsProps {
    breadcumbs: {
        href: string;
        label: string;
    }[],
    top?:number;
    left?:number;
}

const DEF_TOP = 10;
const DEF_LEFT = 10;
export const MyBreadcrumbs:FC<MyBreadcrumbsProps> = ({breadcumbs, top, left}) => {

    const topPos = top ===undefined ?  DEF_TOP : top;
    const leftPos = left ===undefined ?  DEF_LEFT : left;


    return (
        <Breadcrumbs classNames={{
            list:`z-20 dark fixed top-${topPos} left-${leftPos} backdrop-blur bg-black/50`,
        }} itemClasses={{
            item: "font-bold text-lg"
        }} color="secondary" variant="solid">
            {
                breadcumbs.map(({href, label}) => (
                    <BreadcrumbItem href={href} key={href}>{label}</BreadcrumbItem>
                ))
            }
        </Breadcrumbs>
    );
};
