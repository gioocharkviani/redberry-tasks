import { create } from "zustand";
import { Employee, DepartmentType, PriorityTypes } from "@/types";

interface FilterStore {
  department: DepartmentType[];
  priority: PriorityTypes[];
  employs: Employee[];
  allSelectedData: {
    department: DepartmentType[];
    employs: Employee[];
    priority: PriorityTypes[];
  };
  setDepartment: (data: DepartmentType[]) => void;
  setPriority: (data: PriorityTypes[]) => void;
  setEmploys: (data: Employee[]) => void;
  setAllSelectedData: (data: {
    department: DepartmentType[];
    employs: Employee[];
    priority: PriorityTypes[];
  }) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  department: [],
  priority: [],
  employs: [],
  allSelectedData: {
    department: [],
    employs: [],
    priority: [],
  },
  setDepartment: (data) => set({ department: data }),
  setPriority: (data) => set({ priority: data }),
  setEmploys: (data) => set({ employs: data }),
  setAllSelectedData: (data) => set({ allSelectedData: data }),
  resetFilters: () =>
    set({
      department: [],
      priority: [],
      employs: [],
      allSelectedData: {
        department: [],
        employs: [],
        priority: [],
      },
    }),
}));
