import Image from "next/image";
import React, { useRef } from "react";

interface InputProps {
  label?: string;
  value?: File | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemove?: () => void;
  errorText?: string;
}

const ImageInput: React.FC<InputProps> = ({
  label,
  onChange,
  handleRemove,
  errorText,
  value,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const selectedImage = value ? URL.createObjectURL(value) : null;
  return (
    <div className="flex flex-col w-full">
      {label && (
        <span className="text-[#343A40] text-[14px] font-[500]">{label}</span>
      )}

      <div
        className="w-full h-[120px] flex justify-center items-center rounded-[8px] border-dashed border border-[#CED4DA] cursor-pointer"
        onClick={triggerFileInput}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onChange}
        />

        <div className="w-[88px] h-[88px] bg-gray-100 rounded-full relative flex justify-center items-center">
          {selectedImage ? (
            <div className="w-[88px] h-[88px] relative rounded-full">
              <Image
                src={selectedImage}
                alt="Selected"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          ) : (
            <span className="text-gray-500">Avatar</span>
          )}

          {selectedImage && (
            <button
              type="button"
              className="absolute w-[24px] h-[24px] flex justify-center items-center bg-white rounded-full bottom-0 z-[10] right-0 border border-[#6C757D] cursor-pointer"
              onClick={handleRemove}
            >
              <Image width={14} height={14} alt="Remove" src="/trash-2.svg" />
            </button>
          )}
        </div>
      </div>

      {errorText && (
        <div className="text-[#FA4D4D] text-[12px] mt-[4px]">{errorText}</div>
      )}
    </div>
  );
};

export default ImageInput;
