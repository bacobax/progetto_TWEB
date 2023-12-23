import React, { useEffect, useRef, ReactNode } from 'react';

interface ScrollableComponentProps {
    children: ReactNode;
    onBottom: () => void;
    className?: string;
}

const ScrollableComponent: React.FC<ScrollableComponentProps> = ({ children, onBottom, className }) => {


    const handleScroll = (e:   React.UIEvent<HTMLDivElement, UIEvent>) => {

        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        if(  scrollHeight-scrollTop >= clientHeight){
            onBottom();
        }

    };
    return (
        <div onScroll={handleScroll} style={{ overflowY: 'auto', maxHeight: '100%' }} className={className}>
            {children}
        </div>
    );
};

export default ScrollableComponent;