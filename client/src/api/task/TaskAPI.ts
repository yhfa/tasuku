import axios from "src/api/axois.client";

export type TaskAPIParams = {
  data?: object;
  taskId?: string;
};

export const AddTaskAPI = async (params: TaskAPIParams) => {
  return axios.post("/tasks/", params.data);
};

export const EditTaskAPI = async (params: TaskAPIParams) => {
  return axios.patch(`/tasks/${params.taskId}`, params.data);
};

export const DeleteTaskAPI = async (params: TaskAPIParams) => {
  return axios.delete(`/tasks/${params.taskId}`);
};

export const ReorderTaskaAPI = async (params: TaskAPIParams) => {
  return axios.post(`/tasks/reorder-tasks`, params.data);
};
