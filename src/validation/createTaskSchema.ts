import { stringLegthChecker } from "@/utils/stringLegthChecker";
import { z } from "zod";

export const createTaskSchema = z.object({
  name: z
    .string({ required_error: "შეიყვანეთ ინფორმაცია" })
    .trim()
    .min(3, "მინიმუმ 3 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  description: z
    .string()
    .trim()
    .min(4, "მინიმუმ 4 სიმბოლო")
    .max(255, "მაქსიმუმ 255 სიმბოლო"),
  priority_id: z.number({ required_error: "აირჩიეთ პრიორიტეტი" }),
  status_id: z.number({ required_error: "აირჩიეთ სტატუსი" }),
  department_id: z.number({ required_error: "აირჩიეთ დეპარტამენტი" }),
  employee_id: z.number({ required_error: "აირჩიეთ მომხმარებელი" }),
  due_date: z.date({ required_error: "შეიყვანე დედლაინი" }),
});

export type CreateTaskSchemaType = z.infer<typeof createTaskSchema>;

export const tValidation = stringLegthChecker({ min: 3, max: 255 });
export const dValidation = stringLegthChecker({ min: 4, max: 255 });
