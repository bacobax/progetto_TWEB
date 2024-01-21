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

/**
 * MyBreadcrumbs is a functional component in React.
 * It accepts props of type MyBreadcrumbsProps which includes:
 * - breadcumbs: An array of objects, each containing a href and label property. These represent the individual breadcrumbs.
 * - top: A number representing the top position of the breadcrumbs. This prop is optional.
 * - left: A number representing the left position of the breadcrumbs. This prop is optional.
 *
 * The component returns a Breadcrumbs component from the @nextui-org/react library. The Breadcrumbs includes:
 * - A list of BreadcrumbItem components. Each BreadcrumbItem is created by mapping over the breadcumbs prop. The href and label of each breadcrumb are passed to the BreadcrumbItem.
 *
 * The Breadcrumbs component is styled with CSS classes. The list class is applied to the list of breadcrumbs, and the item class is applied to each breadcrumb item.
 */
export const MyBreadcrumbs:FC<MyBreadcrumbsProps> = ({breadcumbs, top, left}) => {
    return (
        <Breadcrumbs classNames={{
            list:`z-20 dark fixed top-2 right-20 backdrop-blur bg-black/50`,
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