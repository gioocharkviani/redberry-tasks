"use client";
import React, { useState } from "react";
import Modal from "./Modal"; // Import the Modal component
import Logo from "./Logo";
import Button from "./ui/Buttons";
import CreateEmployForm from "./forms/CreateEmployForm";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <header className="w-full z-10 flex sticky top-0 bg-white justify-center items-center h-[100px] mb-[40px]">
      <div className="w-full max-w-[1980px] gap-4 flex justify-between items-center px-[20px] xl:px-[120px]">
        <Logo />
        <div className="flex gap-1.5">
          <Button type="second" onClick={toggleModal}>
            თანამშრომლის შექმნა
          </Button>
          <Button type="first">შექმენი ახალი დავალება</Button>
        </div>
      </div>

      {/* Controlled Modal */}
      <Modal open={isModalOpen} setClose={toggleModal}>
        <CreateEmployForm />
      </Modal>
    </header>
  );
};

export default Header;
