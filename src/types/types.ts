export interface Employee {
  id: number;
  name: string;
  surname?: string;
  avatar?: string;
  department?: DepartmentType;
}

export interface DepartmentType {
  id: number;
  name: string;
}

export interface PriorityTypes {
  id: number;
  name: string;
  icon?: string;
}

export interface Status {
  id: number;
  name: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  due_date: string;
  department: DepartmentType;
  employee: Employee;
  status: Status;
  priority: PriorityTypes;
  total_comments: number;
}

export interface SubComment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
}

export interface Comment {
  id: number;
  text: string;
  task_id: number;
  parent_id: number | null;
  author_avatar: string;
  author_nickname: string;
  sub_comments: SubComment[];
}

export interface createCommentBody {
  text: string;
  parent_id: number | null;
}

export interface cTask {
  department: DepartmentType[];
  employ: Employee[];
  status: Status[];
  priorities: PriorityTypes[];
}

interface reqFilds {
  text: string;
  id: number;
}

export interface InputProps {
  label?: string;
  badge?: boolean;
  error?: boolean;
  errorText?: string;
  requiredFilds?: reqFilds[];
  value?: string;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  defaultValue?: string;
  validator?: { text: string; isValid: (value: string) => boolean }[];
}

export interface CreateTask {
  name: string;
  description: string;
  due_date: Date;
  status_id: number;
  employee_id: number;
  priority_id: number;
}
