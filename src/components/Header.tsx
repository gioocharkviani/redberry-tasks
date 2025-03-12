import React from "react";
import Logo from "./Logo";
import Button from "./ui/Buttons";

const Header = () => {
  return (
    <header className="w-full z-10 flex sticky top-0 bg-white justify-center items-center h-[100px] mb-[40px]">
      <div className="w-full max-w-[1980px] gap-4 flex justify-between items-center px-[20px] xl:px-[120px]">
        <Logo />
        <div className="flex gap-1.5">
          <Button type="first">შექმენი ახალი დავალება</Button>
          <Button type="second">შექმნი ახალი დავალება</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
