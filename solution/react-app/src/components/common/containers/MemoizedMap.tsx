import {HTMLAttributes, ReactNode, useMemo} from "react";




interface MemoizedMapProps<T> extends Omit<HTMLAttributes<HTMLDivElement> , 'children'>{
    items: T[];
    children: (item: T) => ReactNode;
}

/**
 * MemoizedMap is a generic functional component in React.
 * It accepts props of type MemoizedMapProps<T> which includes:
 * - items: An array of items of type T.
 * - children: A function that takes an item of type T and returns a ReactNode.
 * - ...divProps: The rest of the props are spread into an object and passed to the div element.
 *
 * The component uses the useMemo hook to optimize performance. The hook takes a function that maps over the items array and calls the children function for each item.
 * The dependencies of the useMemo hook are the items array and the children function. This means that the mapping operation will only be performed again if the items array or the children function change.
 *
 * The component returns a div element with the divProps spread onto it. The div contains the rendered items wrapped in a React fragment.
 */
export default function MemoizedMap<T>(props: MemoizedMapProps<T>){
    const {items, children, ...divProps} = props;
    const renderedItems:ReactNode =  useMemo(() => items.map(children), [items, children]);


    return (<div {...divProps}> <>{renderedItems}</> </div>)

};
