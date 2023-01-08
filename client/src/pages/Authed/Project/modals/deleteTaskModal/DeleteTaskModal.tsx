import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Heading, HStack } from "@chakra-ui/react";

import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import { DeleteTaskAPI } from "src/api/task/TaskAPI";
import { ProjectActionKind } from "src/models/GlobalModules/index";
import { AlertError, SuccessAlert } from "src/components/Alerts";

import { ButtonTypeEnum } from "src/models/GlobalModules";

const DeleteTaskModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  taskId: string;
  taskTitle: string;
  projectDispatch: any;
  sectionTitle: string;
}> = (props) => {
  const {
    isOpen,
    setIsOpen,
    taskId,
    taskTitle,
    projectDispatch,
    sectionTitle,
  } = props;

  const {
    mutate: deleteTaskMutaion,
    status,
    error,
    isLoading,
  } = useMutation(DeleteTaskAPI);

  useEffect(() => {
    if (status === "success") {
      projectDispatch({
        type: ProjectActionKind.deleteTask,
        payload: { columnTitle: sectionTitle, taskId },
      });
      SuccessAlert("Task has been deleted");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [status, error, projectDispatch, sectionTitle, setIsOpen, taskId]);

  const confirmDeleteHandler = () => {
    deleteTaskMutaion({ taskId });
  };
  const closeModalHandler = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} onClose={closeModalHandler} title="You are about to delete this task">
      <Heading as="p" size="md" fontWeight="500" mb="4">
        Delete <span style={{ fontWeight: "700", fontStyle: "italic" }}>"{taskTitle}"</span>?
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
          onClick={confirmDeleteHandler}
          isLoading={isLoading}
        >
          Delete
        </ModalButton>
      </HStack>
    </Modal>
  );
};

export default DeleteTaskModal;
