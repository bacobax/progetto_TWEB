import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import Card from "./Card";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  title: string;
  opened?: boolean;
}

const ModalComponent = (props: ModalProps) => {
  const { children, onClose, className, title } = props;

  return (
    <Card className={styles["modal"] + " " + className}>
      <div className={styles["modal__header"]}>
        <AiOutlineClose onClick={onClose} className={styles["close"]} />
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles["modal__content"]}>{children}</div>
    </Card>
  );
};

const Backdrop = ({ onClick }: { onClick: (e: any) => void }) => {
  return <div className={styles["backdrop"]} onClick={onClick}></div>;
};

const overlayElement = document.getElementById("overlay");
const backdropElement = document.getElementById("backdrop");

const Modal = (props: ModalProps) => {
  if (props.opened) {
    return (
      <>
        {[
          ReactDOM.createPortal(
            <ModalComponent
              children={props.children}
              onClose={props.onClose}
              className={props.className}
              title={props.title}
            />,
            overlayElement instanceof Element ? overlayElement : document.body
          ),
          ReactDOM.createPortal(
            <Backdrop onClick={props.onClose} />,
            backdropElement instanceof Element ? backdropElement : document.body
          ),
        ]}
      </>
    );
  } else {
    return null;
  }
};

export default Modal;
