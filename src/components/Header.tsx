"use client";
import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component
import Logo from "./Logo";
import Button from "./ui/Buttons";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <header className="w-full z-10 flex sticky top-0 bg-white justify-center items-center h-[100px] mb-[40px]">
      <div className="w-full max-w-[1980px] gap-4 flex justify-between items-center px-[20px] xl:px-[120px]">
        <Logo />
        <div className="flex gap-1.5">
          <Button type="first">შექმენი ახალი დავალება</Button>
          <Button type="second" onClick={toggleModal}>
            შექმნი ახალი დავალება
          </Button>
        </div>
      </div>

      {/* Controlled Modal */}
      <Modal open={isModalOpen} setClose={toggleModal}>
        <div>Modal Content</div>
      </Modal>
    </header>
  );
};

export default Header;
