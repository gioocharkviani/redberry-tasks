"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

interface ModalProps {
  children?: React.ReactNode;
  setClose: () => void;
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
    <div className="w-full h-[100vh] fixed bg-[#0D0F1026] backdrop-blur-xs top-0 z-[99] left-0 flex justify-center ">
      <div
        className="bg-white rounded-[10px] relative  pt-[40px] pb-[60px] mt-[118px] px-[50px] max-h-[70vh]"
        ref={modalRef}
      >
        <div className="w-full flex justify-end">
          <button className="cursor-pointer" onClick={() => setClose()}>
            <Image src="close.svg" width={40} height={40} alt="close" />
          </button>
        </div>
        <div className="overflow-y-auto h-full px-[50px]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
