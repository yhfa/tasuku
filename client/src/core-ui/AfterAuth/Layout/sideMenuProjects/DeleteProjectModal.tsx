import React, { useEffect, useContext } from "react";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import { Heading, HStack } from "@chakra-ui/react";

import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import { AlertError, SuccessAlert } from "src/components/Alerts";
import { ProjectContext } from "src/services/ProjectContext";

import { ButtonTypeEnum } from "src/models/GlobalModules";
import { DeleteProjectAPI } from "src/api/project/ProjectAPI";

const DeleteTaskModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  menuProjectId: string;
  projectTitle: string;
}> = (props) => {
  const { isOpen, setIsOpen, menuProjectId, projectTitle } = props;

  let history = useHistory();
  const { getProjectsResponse } = useContext(ProjectContext);
  const { projectId } = useParams<{ projectId: string }>();

  const {
    mutate: deleteProjectMutaion,
    status,
    error,
    isLoading,
  } = useMutation(DeleteProjectAPI);

  useEffect(() => {
    const reloadProjects = async () => await getProjectsResponse.refetch();

    if (status === "success") {
      reloadProjects();
      SuccessAlert("Project has been Deleted.");
      if (projectId === menuProjectId) {
        history.push("/");
      }
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [
    projectId,
    error,
    setIsOpen,
    status,
    getProjectsResponse,
    menuProjectId,
    history,
  ]);

  const deleteProjectHandler = () => deleteProjectMutaion(menuProjectId);

  const closeModalHandler = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalHandler}
      title="You are about to delete this project"
    >
      <Heading as="p" size="md" fontWeight="500" mb="4">
        <>
          <span style={{ fontSize: "1rem", fontWeight: "700", color: "red" }}>NOTE: Deleting a project deletes columns and tasks<br /><br /></span>

          Delete <span style={{ fontWeight: "700", fontStyle: "italic" }}>"{projectTitle}"</span>?
        </>
      </Heading>
      <HStack justify="flex-end">
        <ModalButton
          width="30%"
          background="gray.600"
          backgroundOnHover="gray.500"
          type={ButtonTypeEnum.button}
          onClick={closeModalHandler}
        >
          Cancel
        </ModalButton>
        <ModalButton
          width="30%"
          background="red.600"
          backgroundOnHover="red.500"
          type={ButtonTypeEnum.button}
          onClick={deleteProjectHandler}
          isLoading={isLoading}
        >
          Delete
        </ModalButton>
      </HStack>
    </Modal >
  );
};

export default DeleteTaskModal;
