"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  children?: React.ReactNode;
  setClose?: () => void;
  open: boolean;
}

const Modal = ({ children, setClose, open }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "visible";

    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node))
        if (setClose) {
          setClose();
        }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "visible";
    };
  }, [open, setClose]);

  if (!open) return null;

  return (
    <div className="w-full h-[100vh] fixed backdrop-blur-xs top-0 z-[99] left-0 flex justify-center items-center">
      <div className="modal-content" ref={modalRef}>
        {children}
        <button onClick={setClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
