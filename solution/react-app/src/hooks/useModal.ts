import { useState, useCallback } from "react";

const useModal = (defaultVal: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState(
    defaultVal ? defaultVal : false
  );

  const openModal = useCallback(()=>{
    setIsModalOpen(true);
  },[]);
  const closeModal = useCallback(()=>{
    setIsModalOpen(false);
  },[]);

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
