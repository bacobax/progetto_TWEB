import {HTMLAttributes, ReactNode, useMemo} from "react";




interface MemoizedMapProps<T> extends Omit<HTMLAttributes<HTMLDivElement> , 'children'>{
    items: T[];
    children: (item: T) => ReactNode;
}
export default function MemoizedMap<T>(props: MemoizedMapProps<T>){
    const {items, children, ...divProps} = props;
    const renderedItems:ReactNode =  useMemo(() => items.map(children), [items, children]);


    return (<div {...divProps}> <>{renderedItems}</> </div>)

};
