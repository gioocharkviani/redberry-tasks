import { create } from "zustand";
import { Employee, DepartmentType, PriorityTypes } from "@/types";

interface FilterStore {
  department: DepartmentType[];
  priority: PriorityTypes[];
  employs: Employee[];
  setDepartment: (data: DepartmentType[]) => void;
  setPriority: (data: PriorityTypes[]) => void;
  setEmploys: (data: Employee[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  department: [],
  priority: [],
  employs: [],
  setDepartment: (data) => set({ department: data }),
  setPriority: (data) => set({ priority: data }),
  setEmploys: (data) => set({ employs: data }),
  resetFilters: () => set({ department: [], priority: [], employs: [] }),
}));
