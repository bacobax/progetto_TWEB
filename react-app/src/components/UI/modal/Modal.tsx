import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import ReactDOM from 'react-dom';
import { useSpring, animated, SpringValue } from '@react-spring/web';
import styles from './Modal.module.css';
import Card from '../Card';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  title: string;
  opened?: boolean;
}

interface ModalStyles {
  opacity: SpringValue<number>;
  transform: SpringValue<string>;
}

const ModalComponent = (props: ModalProps & { style?: ModalStyles }) => {
  const { children, onClose, className, title, style } = props;

  return (
      <Card className={`${styles.modal} ${className}`}>
        <animated.div
            style={{
              opacity: style?.opacity,
              transform: style?.transform,
            }}
            className={styles.modalContent}
        >
          <div className={styles.modal__header}>
            <AiOutlineClose onClick={onClose} className={styles.close} />
            <h3 className={styles.title}>{title}</h3>
          </div>
          <div className={styles.modal__content}>{children}</div>
        </animated.div>
      </Card>
  );
};

const Backdrop = ({ onClick }: { onClick: (e: any) => void }) => {
  return <div className={styles.backdrop} onClick={onClick}></div>;
};

const overlayElement = document.getElementById('overlay');
const backdropElement = document.getElementById('backdrop');

const Modal = (props: ModalProps) => {


  const modalAnimation = useSpring({
    opacity: props.opened ? 1 : 0,
    transform: props.opened ? 'translateY(0)' : 'translateY(-50px)',
  });




  return (
      <>
        {props.opened &&
            ReactDOM.createPortal(
                <ModalComponent
                    children={props.children}
                    onClose={props.onClose}
                    className={props.className}
                    title={props.title}
                    style={modalAnimation as ModalStyles}
                />,
                overlayElement instanceof Element ? overlayElement : document.body
            )}
        {props.opened &&
            ReactDOM.createPortal(
                <Backdrop onClick={props.onClose} />,
                backdropElement instanceof Element ? backdropElement : document.body
            )}
      </>
  );
};

export default Modal;
