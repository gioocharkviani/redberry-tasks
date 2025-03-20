"use client";
import React, { useEffect, useState } from "react";
import Calendar from "@/components/ui/Calendar";
import DropDownSelect from "@/components/ui/DropDownSelect";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import {
  cTask,
  DepartmentType,
  Employee,
  PriorityTypes,
  Status,
} from "@/types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskSchema,
  CreateTaskSchemaType,
  dValidation,
  tValidation,
} from "@/validation";
import Button from "../ui/Buttons";
import Image from "next/image";
import { createTaskAction } from "@/actions/createTaskAction";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modalStore";
import Plus from "../svg/Plus";

const CreateTask = ({ department, employ, status, priorities }: cTask) => {
  const router = useRouter();
  const { setIsOpen } = useModalStore((state) => state);

  const [selectedStore, setSelectedStore] = useState<DepartmentType | null>(
    null
  );
  const [pri, setPri] = useState<PriorityTypes>(priorities[0]);
  const [stat, setStat] = useState<Status>(status[0]);

  const [employStore, setEmployStore] = useState<Employee>();
  const [succRes, setSucRes] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const employFilteredData = employ.filter(
    (e) => e.department?.id === selectedStore?.id
  );
  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setValue("status_id", status[0].id);
    setValue("priority_id", priorities[0].id);
    setValue("due_date", tomorrow);
  }, []);

  const onSubmit = async (data: CreateTaskSchemaType) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { department_id, ...newData } = data;
    try {
      setLoading(true);
      const res = await createTaskAction(newData);
      setSucRes("დავალება წამატებით შეიქმნა.");
      setLoading(false);
      setTimeout(() => {
        setSucRes("");
        router.replace("/");
      }, 2000);
      return res;
    } catch (error) {
      setLoading(false);
      return error;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="gap-[55px] grid grid-cols-2">
          <Controller
            name="name"
            control={control}
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  value={field?.value}
                  error={!!errors.name}
                  label="სათაური*"
                  onChange={field.onChange}
                  validator={tValidation}
                />
              );
            }}
          />

          <Controller
            name="department_id"
            control={control}
            render={({ field }) => {
              return (
                <DropDownSelect
                  {...field}
                  errorText={errors.department_id?.message}
                  error={!!errors.department_id}
                  label="დეპარტამენტი*"
                  selected={selectedStore?.name}
                  defaultValue="აირჩიეთ დეპარტამენტი"
                >
                  {department.map((i) => {
                    return (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setValue("department_id", i.id);
                          setSelectedStore(i);
                        }}
                        key={i.id}
                        className={`px-[14px]  text-start cursor-pointer w-full py-[12px] text-[14px] font-[300]`}
                      >
                        {i.name}
                      </button>
                    );
                  })}
                </DropDownSelect>
              );
            }}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => {
              return (
                <Textarea
                  {...field}
                  value={field?.value}
                  error={!!errors.description}
                  errorText={errors.description?.message}
                  label="აღწერა*"
                  onChange={field.onChange}
                  validator={dValidation}
                />
              );
            }}
          />

          <Controller
            name="employee_id"
            control={control}
            render={({ field }) => {
              return (
                <DropDownSelect
                  {...field}
                  errorText={errors.employee_id?.message}
                  error={!!errors.employee_id}
                  label="პასუხისმგებელი თანამშრომელი*"
                  selected={employStore?.name}
                  icon={employStore?.avatar}
                  disable={!selectedStore}
                  iconSize="AVATAR"
                  defaultValue="აირჩიეთ თანამშრომელი"
                >
                  <button
                    className="flex justify-start gap-3 items-center px-[14px] pt-[12px] cursor-pointer hover:opacity-[0.5]"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                  >
                    <Plus />
                    <span className="text-[16px] font-[400] text-[#8338EC]">
                      დაამატე თანამშრომელი
                    </span>
                  </button>
                  <div className="flex flex-col pb-[20px]">
                    {employFilteredData.map((i) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setValue("employee_id", i.id);
                            setEmployStore(i);
                          }}
                          key={i.id}
                          className="flex justify-start gap-3 items-center px-[12px] pt-[12px] cursor-pointer hover:opacity-[0.5]"
                        >
                          <div className="w-[28px] h-[28px] rounded-full overflow-hidden object-contain bg-slate-200">
                            <Image
                              src={`${i.avatar}`}
                              className="w-[28px] h-[28px] rounded-[50%] object-contain"
                              width={28}
                              height={28}
                              alt={i.name}
                            />
                          </div>
                          <span className="text-[16px] font-[400] text-[#8338EC]">
                            {i.name} {i.surname}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </DropDownSelect>
              );
            }}
          />

          <div className="flex gap-5 ">
            <Controller
              name="priority_id"
              control={control}
              render={({ field }) => {
                return (
                  <DropDownSelect
                    {...field}
                    errorText={errors.priority_id?.message}
                    error={!!errors.priority_id}
                    label="პრიორიტეტი*"
                    selected={pri.name}
                    icon={pri.icon}
                  >
                    {priorities.map((i) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setValue("priority_id", i.id);
                            setPri(i);
                          }}
                          key={i.id}
                          className={`px-[14px]  text-start cursor-pointer w-full py-[12px] text-[14px] font-[300]`}
                        >
                          <div className="flex items-center gap-2">
                            <Image
                              width={16}
                              height={16}
                              alt=""
                              src={`${i.icon}`}
                            />
                            <span>{i.name}</span>
                          </div>
                        </button>
                      );
                    })}
                  </DropDownSelect>
                );
              }}
            />
            <Controller
              name="status_id"
              control={control}
              render={({ field }) => {
                return (
                  <DropDownSelect
                    {...field}
                    errorText={errors.status_id?.message}
                    error={!!errors.status_id}
                    label="სტატუსი*"
                    selected={stat.name}
                  >
                    {status.map((i) => {
                      return (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setValue("status_id", i.id);
                            setStat(i);
                          }}
                          key={i.id}
                          className={`px-[14px]  text-start cursor-pointer w-full py-[12px] text-[14px] font-[300]`}
                        >
                          <span>{i.name}</span>
                        </button>
                      );
                    })}
                  </DropDownSelect>
                );
              }}
            />
          </div>

          <div className="w-[200px]">
            <Controller
              name="due_date"
              control={control}
              render={({ field }) => (
                <Calendar
                  {...field}
                  onChange={(e) => {
                    const dateValue = new Date(e.target.value);
                    field.onChange(dateValue);
                    setValue("due_date", dateValue);
                  }}
                  error={!!errors.due_date}
                  errorText={errors.due_date?.message}
                  label="დედლაინი*"
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-end items-center mt-[20px] gap-3">
          {succRes && (
            <span className="text-[14px]  font-[300] text-green-600">
              {succRes}
            </span>
          )}
          <Button disabled={isLoading} type="submit">
            დავალების შექმნა
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateTask;
