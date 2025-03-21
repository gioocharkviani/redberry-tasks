"use client";
import React from "react";
import Modal from "./Modal";
import Button from "./ui/Buttons";
import { useModalStore } from "@/store/modalStore";
import Logo from "./Logo";
import CreateEmployForm from "./forms/CreateEmployForm";
import Link from "next/link";
import Image from "next/image";
import AddIcon from "../../public/add.svg";

const Header = () => {
  const { isOpen, setIsOpen } = useModalStore((state) => state);

  return (
    <header className="w-[100%] z-10 flex sticky top-0 bg-white justify-center items-center h-[100px] mb-[40px]">
      <div className="w-full max-w-[1980px] gap-4 flex justify-between items-center px-[20px] xl:px-[120px]">
        <Logo />
        <div className="flex gap-1.5 shrink-0">
          <Button btntype="second" onClick={() => setIsOpen(true)}>
            თანამშრომლის შექმნა
          </Button>
          <Link
            href="/create-task"
            className="text-white text-[16px] h-[42px] rounded-[5px] flex items-center gap-[4px] py-[10px] px-[20px] bg-[#8338EC] hover:bg-[#B588F4]  transition-all group"
          >
            <Image
              src={AddIcon}
              width={20}
              height={20}
              alt="add"
              className="transition-opacity duration-300 opacity-100 group-hover:opacity-50"
            />
            შექმენი ახალი დავალება
          </Link>
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
