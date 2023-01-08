import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Heading, HStack } from "@chakra-ui/react";

import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import { CompelteAllTasksAPI } from "src/api/section/SectionAPI";
import { ProjectActionKind } from "src/models/GlobalModules/index";
import { AlertError, SuccessAlert } from "src/components/Alerts";

import { ButtonTypeEnum } from "src/models/GlobalModules";

const CompelteAllTasksModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
  projectDispatch: any;
  sectionTitle: string;
}> = (props) => {
  const { isOpen, setIsOpen, projectId, projectDispatch, sectionTitle } = props;

  const {
    mutate: compelteAllTasksMutaion,
    status,
    error,
    isLoading,
  } = useMutation(CompelteAllTasksAPI);

  useEffect(() => {
    if (status === "success") {
      projectDispatch({
        type: ProjectActionKind.completeAllTasks,
        payload: { columnTitle: sectionTitle },
      });
      SuccessAlert("Tasks for this section are completed");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [status, error, projectDispatch, sectionTitle, setIsOpen]);

  const confirmFinishTasksHandler = () => {
    compelteAllTasksMutaion({
      data: { columnTitle: sectionTitle, boardId: projectId },
    });
  };
  const closeModalHandler = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalHandler}
      title="Complete All Tasks"
    >
      <Heading as="p" size="md" fontWeight="500" mb="4">
        Mark all tasks as Done?
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
          background="green.600"
          backgroundOnHover="green.500"
          type={ButtonTypeEnum.button}
          onClick={confirmFinishTasksHandler}
          isLoading={isLoading}
        >
          Yes
        </ModalButton>
      </HStack>
    </Modal>
  );
};

export default CompelteAllTasksModal;
