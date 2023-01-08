export enum TaskStateEnum {
  started = "Started",
  inProgress = "In Progress",
  done = "Done",
  overDue = "Over due",
}
export interface TransformedSection {
  title: string;
  tasks: Task[];
}
export interface Task {
  boardId: string;
  columnTitle: string;
  from: Date;
  state: TaskStateEnum;
  team: string;
  title: string;
  to: Date;
  __v?: number;
  _id: string;
  position: number;
}

export interface Member {
  boards: string[];
  email: string;
  id: string;
  image: string;
  name: string;
  password: string;
  role: MemberRoleEnum;
  __v?: number;
  _id: string;
}

export interface Project {
  authorId: string;
  columns: TransformedSection[];
  createdAt: Date;
  id: string;
  members: Member[];
  title: string;
  __v: Number;
  _id: string;
}

export enum ProjectActionKind {
  loadProject = "LOAD_PROJECT",
  editProject = "EDIT_PROJECT",
  addSection = "ADD_SECTION",
  deleteSection = "DELETE_SECTION",
  editSection = "EDIT_SECTION",
  addTask = "ADD_TASK",
  deleteTask = "DELETE_TASK",
  editTask = "EDIT_Task",
  completeAllTasks = "COMPLETE_ALL_TASKS",
  reorderTasks = "REORDER_TASKS",
  reorderSections = "REORDER_SECTIONS",
}

export interface ProjectAction {
  type: ProjectActionKind;
  payload?: any;
}

export enum ButtonTypeEnum {
  button = "button",
  submit = "submit",
  reset = "reset",
}

export enum MemberRoleEnum {
  owner = "owner",
  editor = "editor",
  viewer = "viewer",
}

export type AddProjectInputs = {
  title: string;
  members: {
    email: string;
    role: MemberRoleEnum;
  }[];
};


export interface ICreateBoard {
  title: string;
  members: any;
  tasks: any;
  history: any;
}

export interface IEditBoard {
  editBoardId: string;
  title: string;
  teamName: string;

  authorName: string;
  authorId: string;
}

export interface IDeleteBoard {
  deleteBoardId: string;
}

export interface ICreateTask {
  title: string;
  members: any;
  tasks: any;
  history: any;
}

export interface IEditTask {
  editBoardId: string;
  title: string;
  teamName: string;

  authorName: string;
  authorId: string;
}

export interface IDeleteTask {
  deleteBoardId: string;
}
export interface IPreDefinedItem {
  id: string;
  name: string;
}
export interface IPreDefinedList {
  data: IPreDefinedItem[];
}

export enum EAccountType {
  PenTester = "pentester",
  Employee = "employee",
}

export enum EClientSize {
  TINY = 1,
  SMALL = 2,
  MEDIUM = 3,
  LARGE = 4,
}
export const useClientSize = ["51-500", "501-1000", "+1000", "1-50"];

export enum EClientStatus {
  PENDING = 1,
  APPROVED = 2,
  REJECTED = 3,
  BLOCKED = 4,
}
export const useClientStatus = ["Pending", "Active", "Rejected", "Blocked"];
export const useTableStatusVariants = [
  "primary",
  "success",
  "secondary",
  "danger",
];
export enum EImageType {
  IMAGE = 1,
  THUMBNAIL = 2,
  ICON = 3,
}
export enum EInquiryStatus {
  OPEN = 1,
  IN_PROGRESS = 2,
  RESOLVED = 3,
}
export enum EUserStatus {
  PENDING = 1,
  APPROVED = 2,
  BLOCKED = 3,
}
