import React from "react";
import Logo from "./Logo";
import Button from "./ui/Buttons";

const Header = () => {
  return (
    <header className="w-full  z-10 flex sticky top-0 bg-white justify-between gap-5 items-center h-[100px] mb-[40px]">
      <Logo />
      <div className="flex gap-1.5">
        <Button type="first">შექმენი ახალი დავალება</Button>
        <Button type="second">შექმენი ახალი დავალება</Button>
      </div>
    </header>
  );
};

export default Header;
