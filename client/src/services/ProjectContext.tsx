import { createContext } from "react";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import { getLocalStoredData } from "src/_helpers/_localStorage";
import axios from "src/api/axois.client";
import {
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryResult,
} from "react-query";
// interfaces for types in useMutation args
import {
  ICreateBoard,
  IEditBoard,
  IDeleteBoard,
} from "src/models/GlobalModules";
import { AxiosResponse } from "axios";
const { REACT_APP_API_BASE } = process.env

export const userToken = getLocalStoredData(ConstLocalStorage.accessToken);
export const ProjectContext = createContext<{
  getProjectsResponse: UseQueryResult<AxiosResponse<never>, unknown> | any;
  createBoardMutation:
  | UseMutationResult<ICreateBoard, Error, ICreateBoard, unknown>
  | any;
  deleteBoardMutation:
  | UseMutationResult<IEditBoard, Error, IEditBoard, unknown>
  | any;
  editBoardMutation:
  | UseMutationResult<IDeleteBoard, Error, IDeleteBoard, unknown>
  | any;
}>({
  getProjectsResponse: (): any => { },
  createBoardMutation: (): any => { },
  deleteBoardMutation: (): any => { },
  editBoardMutation: (): any => { },
});
const ProjectContextProvider = (props: any) => {
  /* ********************GET******************** */
  const getProjects = async () => {
    const res = await axios.get(`${REACT_APP_API_BASE}/boards/`, {
      headers: {
        Authorization: userToken,
      },
    });
    return res;
  };
  const getProjectsResponse = useQuery("Projects", getProjects);
  /* ********************POST******************** */
  const createBoard = async (
    title: string,
    members: any,
    tasks: any,
    history: any
  ): Promise<any> => {
    const headers = {
      Authorization: userToken,
    };

    let response: any = await axios.post(
      `${REACT_APP_API_BASE}/boards/`,
      {
        title,
        members,
        tasks,
      },
      { headers }
    );

    await getProjectsResponse.refetch();
    history.push(`/projects/${response.data.board.id}`);
  };

  const createBoardMutation: UseMutationResult<
    ICreateBoard,
    Error,
    ICreateBoard
  > = useMutation<ICreateBoard, Error, ICreateBoard>(
    async ({ title, members, tasks, history }) =>
      createBoard(title, members, tasks, history)
  );

  /* ********************EDIT******************** */

  const editBoard = async (
    editBoardId: string,
    title: string,
    teamName: string,
    authorName: string,
    authorId: string
  ): Promise<any> => {
    const headers = {
      Authorization: userToken,
    };

    await axios.put(
      `${REACT_APP_API_BASE}/boards/${editBoardId}`,
      {
        title,
        teamName,
        authorName,
        authorId,
      },
      { headers }
    );
  };

  const editBoardMutation: UseMutationResult<IEditBoard, Error, IEditBoard> =
    useMutation<IEditBoard, Error, IEditBoard>(
      async ({ editBoardId, title, teamName, authorName, authorId }) =>
        editBoard(editBoardId, title, teamName, authorName, authorId)
    );

  /* ********************DELETE******************** */
  const deleteBoard = async (deleteBoardId: string): Promise<any> => {
    await axios
      .delete<any>(`${REACT_APP_API_BASE}/boards/${deleteBoardId}`)
      .then(async () => await getProjectsResponse.refetch());

  };

  const deleteBoardMutation: UseMutationResult<
    IDeleteBoard,
    Error,
    IDeleteBoard
  > = useMutation<IDeleteBoard, Error, IDeleteBoard>(
    async ({ deleteBoardId }) => deleteBoard(deleteBoardId)
  );

  return (
    <ProjectContext.Provider
      value={{
        getProjectsResponse,
        createBoardMutation,
        deleteBoardMutation,
        editBoardMutation,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};
export default ProjectContextProvider;
