import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import ImageInput from "../ui/ImageInput";
import DropDownSelect from "../ui/DropDownSelect";
import { DepartmentType } from "@/types";
import Button from "../ui/Buttons";
import DotLoader from "../Dotloader";
import { useModalStore } from "@/store/modalStore";
import { createEmploy } from "@/actions/Employ";
import { getAllDepartment } from "@/actions/departmentAction";
import {
  CreateEmploySchema,
  CreateEmploySchemaType,
  nValidation,
  sValidation,
} from "@/validation";

const CreateEmployForm = () => {
  const { setIsOpen } = useModalStore((state) => state);
  const [dep, setDep] = useState<DepartmentType[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDep, setSelectedDep] = useState<DepartmentType | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    resetField,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<CreateEmploySchemaType>({
    resolver: zodResolver(CreateEmploySchema),
    mode: "onChange",
  });

  useEffect(() => {
    const getDeparmet = async () => {
      try {
        const res = await getAllDepartment();
        setDep(res);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    getDeparmet();
  }, []);

  useEffect(() => {
    if (selectedDep) {
      setValue("department_id", selectedDep.id);
      clearErrors("department_id");
    }
  }, [selectedDep, setValue, clearErrors]);

  const onSubmit = async (data: CreateEmploySchemaType) => {
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("department_id", data.department_id.toString());
    if (file) {
      formData.append("avatar", file);
    }
    try {
      const res = await createEmploy({ data: formData });
      reset();
      setFile(null);
      setSelectedDep(null);
      setSuccessMessage("თანამშრომელი წამატებით დაემატა");
      setTimeout(() => setSuccessMessage(null), 3000);
      setLoading(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
      return res;
    } catch (error) {
      setErrorMessage("შეცდმა დამატების დროს");
      setTimeout(() => setErrorMessage(null), 3000);
      console.error("Error:", error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-[813px] mt-[38px] flex flex-col relative">
        {(loading || successMessage || errorMessage) && (
          <div className="absolute overflow-hidden z-[20] backdrop-blur-xs w-full h-full flex justify-center items-center">
            {loading ? (
              <DotLoader />
            ) : successMessage ? (
              <div className="text-green-500 font-[500]">{successMessage}</div>
            ) : errorMessage ? (
              <div className="text-red-500 font-[500]">{errorMessage}</div>
            ) : null}
          </div>
        )}
        <span className="font-[500] text-[32px] text-center">
          თანამშრომლის დამატება
        </span>
        <form className="mt-[45px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-[45px] w-full">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="სახელი*"
                  badge
                  value={field.value}
                  error={!!errors.name}
                  validator={nValidation}
                />
              )}
            />
            <Controller
              name="surname"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="გვარი*"
                  badge
                  value={field.value}
                  error={!!errors.surname}
                  validator={sValidation}
                />
              )}
            />
          </div>
          <div className="mt-[45px]">
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <ImageInput
                  errorText={errors.avatar?.message}
                  {...field}
                  label="ავატარი*"
                  value={file}
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                      setFile(selectedFile);
                      setValue("avatar", selectedFile);
                      clearErrors("avatar");
                    }
                  }}
                  handleRemove={() => {
                    resetField("avatar");
                    setFile(null);
                  }}
                />
              )}
            />
          </div>
          <div className="mt-[45px] w-max">
            <Controller
              name="department_id"
              control={control}
              render={({ field }) => (
                <DropDownSelect
                  label="დეპარტამენტი*"
                  error={!!errors.department_id}
                  {...field}
                  defaultValue="აირჩიეთ"
                  errorText={errors.department_id?.message}
                  selected={selectedDep?.name}
                >
                  <div className="w-full relative flex flex-col gap-1">
                    {dep.map((i) => (
                      <button
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {
                          event.preventDefault();
                          setSelectedDep(i);
                        }}
                        key={i.id}
                        className="px-[14px] text-start cursor-pointer py-[12px] text-[14px] font-[300]"
                      >
                        {i.name}
                      </button>
                    ))}
                  </div>
                </DropDownSelect>
              )}
            />
          </div>
          <div className="w-full items-center mt-[45px] gap-4 flex justify-end">
            <Button
              btntype="second"
              className="w-max mt-[20px]"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                setIsOpen(false);
              }}
            >
              გაუქმება
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className={`w-max mt-[20px]`}
            >
              დაამატე თანამშრომელი
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateEmployForm;
