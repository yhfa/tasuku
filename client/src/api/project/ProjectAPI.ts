import axios from "src/api/axois.client";

export type ProjectAPIParams = {
  data: object;
  projectId: string;
};

export const GetProjectAPI = async (projectId: string) => {
  return axios.get(`/boards/${projectId}`);
};

export const EditProjectAPI = async (params: ProjectAPIParams) => {
  return axios.patch(`/boards/${params.projectId}`, params.data);
};

export const DeleteProjectAPI = async (projectId: string) => {
  return axios.delete(`/boards/${projectId}`);
};
