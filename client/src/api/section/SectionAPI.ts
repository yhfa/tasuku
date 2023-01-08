import axios from "src/api/axois.client";

export type SectionAPIParams = {
  data: object;
  projectId?: string;
};

export const AddSectionAPI = async (params: SectionAPIParams) => {
  return axios.post(`/column/${params.projectId}`, params.data);
};

export const EditSectionAPI = async (params: SectionAPIParams) => {
  return axios.patch(`/column/${params.projectId}`, params.data);
};

export const DeleteSectionAPI = async (params: SectionAPIParams) => {
  return axios({
    url: `/column/${params.projectId}`,
    method: "DELETE",
    data: params.data,
  });
};

export const CompelteAllTasksAPI = async (params: SectionAPIParams) => {
  return axios.post(`/column/compelte-all`, params.data);
};

export const ReorderSectionsAPI = async (params: SectionAPIParams) => {
  return axios.post(`/column/reorder-columns`, params.data);
};
