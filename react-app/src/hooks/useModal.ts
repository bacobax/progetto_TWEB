import { useState } from "react";

const useModal = (defaultVal: boolean) => {
  const [isModalOpen, setIsModalOpen] = useState(
    defaultVal ? defaultVal : false
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal };
};

export default useModal;
