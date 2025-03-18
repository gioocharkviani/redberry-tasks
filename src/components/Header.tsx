"use client";
import React from "react";
import Modal from "./Modal";
import Button from "./ui/Buttons";
import { useModalStore } from "@/store/modalStore";
import Logo from "./Logo";
import CreateEmployForm from "./forms/CreateEmployForm";

const Header = () => {
  const { isOpen, setIsOpen } = useModalStore((state) => state);

  return (
    <header className="w-full z-10 flex sticky top-0 bg-white justify-center items-center h-[100px] mb-[40px]">
      <div className="w-full max-w-[1980px] gap-4 flex justify-between items-center px-[20px] xl:px-[120px]">
        <Logo />
        <div className="flex gap-1.5">
          <Button btntype="second" onClick={() => setIsOpen(true)}>
            თანამშრომლის შექმნა
          </Button>
          <Button icon btntype="first">
            შექმენი ახალი დავალება
          </Button>
        </div>
      </div>

      {/* Controlled Modal */}
      <Modal open={isOpen} setClose={() => setIsOpen(false)}>
        <CreateEmployForm />
      </Modal>
    </header>
  );
};

export default Header;
