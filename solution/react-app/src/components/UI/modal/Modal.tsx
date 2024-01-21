import React, {FC} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import Card from '../Card';
import {AnimatePresence, motion} from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  classNames?: {
      modal?: string,
      content?:string
  };
  title: string;
  opened?: boolean;
}

const AnimatedCard = motion(Card);
const TRANSITION_DURATION = 0.3;
const overlayElement = document.getElementById('overlay');
const backdropElement = document.getElementById('backdrop');
const ModalComponent: React.FC<ModalProps> = (props) => {
  const { children, onClose, classNames, title } = props;

  return createPortal(
      <AnimatedCard className={`${styles.modal} ${classNames?.modal}`}
        variants={{
            hidden: {
                opacity: 0,
                y: 100,
                x: "-50%"
            },
            visible: {
                opacity: 1,
                y: "-50%",
                x: "-50%",
            },
        }}

        initial="hidden" animate="visible" exit="hidden"
        transition={{
            type: "spring",
            duration: TRANSITION_DURATION,
        }}
      >
          <div className={`${styles.modalContent}`}>
              <div className={styles.modal__header}>
                  <AiOutlineClose onClick={onClose} className={styles.close} />
                  <h3 className={styles.title}>{title}</h3>
              </div>
              <div className={`${styles.modal__content} ${classNames?.content}`}>{children}</div>
          </div>
      </AnimatedCard>,
      overlayElement instanceof Element ? overlayElement : document.body);
};

const Backdrop = ({ onClick }: { onClick: (e: any) => void }) => {
  return createPortal(
      <motion.div className={styles.backdrop} onClick={onClick}
      variants={{
            hidden: {
                opacity: 0,
            },
            visible: {
                opacity: 1,
            },

      }}
            initial={"hidden"} animate={"visible"} exit={"hidden"}
                  transition={{
          type: "spring",
          duration: TRANSITION_DURATION,
      }}
      />

     , backdropElement instanceof Element ? backdropElement : document.body);
};


/**
 * Modal is a functional component in React.
 * It accepts props of type ModalProps which includes:
 * - children: The child elements to be rendered within the Modal component.
 * - onClose: A function to be executed when the modal is closed.
 * - classNames: An object containing optional CSS classes to be applied to the modal and its content.
 * - title: A string representing the title of the modal.
 * - opened: A boolean indicating whether the modal is open.
 *
 * The component returns a fragment containing two AnimatePresence components from the framer-motion library.
 * - The first AnimatePresence wraps the ModalComponent. If the opened prop is true, the ModalComponent is rendered with the props and children passed to the Modal component.
 * - The second AnimatePresence wraps the Backdrop component. If the opened prop is true, the Backdrop component is rendered with the onClose prop passed to the Modal component.
 */
const Modal:FC<ModalProps> = ({children, ...props}) => {

  return (
      <>
          <AnimatePresence>
              {props.opened &&
                  <ModalComponent {...props}>
                      {children}
                  </ModalComponent>
              }
          </AnimatePresence>
          <AnimatePresence>
             {props.opened && <Backdrop onClick={props.onClose} />}
          </AnimatePresence>
      </>
  );
};

export default Modal;
