import { stringLegthChecker } from "@/utils/stringLegthChecker";
import { z } from "zod";

export const CreateEmploySchema = z.object({
  name: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  surname: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  department_id: z.number({ required_error: "დეპარტამენტი არ არის არჩეული" }),
  avatar: z
    .instanceof(File, { message: "გთხოვთ ატვირთოთ სურათი" })
    .refine((file) => file.type.startsWith("image/"), {
      message: "გთხოვთ ატვირთოთ სურათი",
    })
    .refine((file) => file.size <= 600000, {
      message: "ფაილის ზომა არ უნდა აღემატებოდეს 600KB",
    }),
});

export type CreateEmploySchemaType = z.infer<typeof CreateEmploySchema>;

export const nValidation = stringLegthChecker({ min: 2, max: 255 });
export const sValidation = stringLegthChecker({ min: 2, max: 255 });
