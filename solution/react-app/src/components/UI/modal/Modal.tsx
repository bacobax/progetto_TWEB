import React, {FC} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import {createPortal} from 'react-dom';
import styles from './Modal.module.css';
import Card from '../Card';
import {AnimatePresence, motion} from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
  title: string;
  opened?: boolean;
}

const AnimatedCard = motion(Card);
const TRANSITION_DURATION = 0.3;
const overlayElement = document.getElementById('overlay');
const backdropElement = document.getElementById('backdrop');
const ModalComponent: React.FC<ModalProps> = (props) => {
  const { children, onClose, className, title } = props;

  return createPortal(
      <AnimatedCard className={`${styles.modal} ${className}`}
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
          <div className={styles.modalContent}>
              <div className={styles.modal__header}>
                  <AiOutlineClose onClick={onClose} className={styles.close} />
                  <h3 className={styles.title}>{title}</h3>
              </div>
              <div className={styles.modal__content}>{children}</div>
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
