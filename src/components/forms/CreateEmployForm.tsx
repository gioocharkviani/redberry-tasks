import React from "react";
import Input from "../ui/Input";

const CreateEmployForm = () => {
  return (
    <div className="w-[813px] flex flex-col">
      <span className="font-[500] text-[32px] text-center">
        თანამშრომლის დამატება
      </span>
      <form>
        <div className="flex gap-[45px] w-full">
          <Input label="სახელი*" badge />
          <Input label="გვარი*" badge />
        </div>
      </form>
    </div>
  );
};

export default CreateEmployForm;
