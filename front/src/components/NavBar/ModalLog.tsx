// components/Modal.tsx
"use client";
//importamos interface
import { ModalProps } from "@/interfaces/Modal.interface";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  //manejamos el click fuera del modal
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  "
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-700 rounded-md relative flex flex-col p-2">
        <span
          onClick={onClose}
          className="absolute top-2 right-2 text-red-800  font-extrabold hover:scale-125 material-icons cursor-pointer bg-white rounded-full "
        >
          close
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
