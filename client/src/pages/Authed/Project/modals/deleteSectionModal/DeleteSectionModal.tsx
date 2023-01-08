import React, { useEffect } from "react";
import { useMutation } from "react-query";
import { Heading, HStack } from "@chakra-ui/react";

import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import { DeleteSectionAPI } from "src/api/section/SectionAPI";
import { ProjectActionKind } from "src/models/GlobalModules/index";
import { AlertError, SuccessAlert } from "src/components/Alerts";

import { ButtonTypeEnum } from "src/models/GlobalModules";

const DeleteSectionModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
  projectDispatch: any;
  sectionTitle: string;
}> = (props) => {
  const { isOpen, setIsOpen, projectId, projectDispatch, sectionTitle } = props;

  const {
    mutate: deleteSectionMutaion,
    status,
    error,
    isLoading,
  } = useMutation(DeleteSectionAPI);

  useEffect(() => {
    if (status === "success") {
      projectDispatch({
        type: ProjectActionKind.deleteSection,
        payload: { title: sectionTitle },
      });
      SuccessAlert("Section has been deleted");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [status, error, projectDispatch, sectionTitle, setIsOpen]);

  const confirmDeleteHandler = () => {
    deleteSectionMutaion({
      data: { title: sectionTitle },
      projectId: projectId,
    });
  };
  const closeModalHandler = () => setIsOpen(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalHandler}
      title="You are about to delete this section"
    >
      <Heading as="p" size="md" fontWeight="500" mb="4">
        <span style={{ fontSize: "1rem", fontWeight: "700", color: "red" }}>NOTE: Deleting sections removes their tasks</span><br /><br />

        Delete <span style={{ fontWeight: "700", fontStyle: "italic" }}>"{sectionTitle}"</span> with all its tasks?
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

export default DeleteSectionModal;
