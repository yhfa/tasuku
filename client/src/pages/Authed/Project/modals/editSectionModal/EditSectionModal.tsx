import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

import Modal from "src/components/Modal/Modal";
import ModalInput from "src/components/Modal/ModalInput";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import ModalButton from "src/components/Modal/ModalButton";
import { EditSectionAPI } from "src/api/section/SectionAPI";
import { ProjectActionKind, ButtonTypeEnum } from "src/models/GlobalModules";
import { AlertError, SuccessAlert } from "src/components/Alerts";

const EditSectionModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
  projectDispatch: any;
  sectionTitle: string;
}> = (props) => {
  const { isOpen, setIsOpen, projectId, projectDispatch, sectionTitle } = props;
  type Inputs = {
    title: string;
  };
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<Inputs>({
      mode: "onChange",
    });

  const {
    mutate: editSectionMutaion,
    status,
    error,
    isLoading,
  } = useMutation(EditSectionAPI);

  useEffect(() => {
    if (status === "success") {
      projectDispatch({
        type: ProjectActionKind.editSection,
        payload: { currentTitle: sectionTitle, newTitle: getValues().title },
      });
      reset();
      SuccessAlert("Section has been edited");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [
    error,
    getValues,
    projectDispatch,
    reset,
    sectionTitle,
    setIsOpen,
    status,
  ]);

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
    editSectionMutaion({
      data: { currenrTitle: sectionTitle, newTitle: formData.title },
      projectId: projectId,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={`Edit ${sectionTitle}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          placeHolder="e.g ToDo, Ideas, etc.."
          label="Name"
          registerFN={register}
          fieldName="title"
          registerOptions={{ required: true }}
          defaultValue={sectionTitle}
        />
        <ModalErrorMessage isVaild={!!formState.errors.title}>
          This field is required.
        </ModalErrorMessage>
        <ModalButton
          background="brand.700"
          backgroundOnHover="brand.100"
          disabled={!formState.isValid}
          type={ButtonTypeEnum.submit}
          isLoading={isLoading}
        >
          Edit Section
        </ModalButton>
      </form>
    </Modal>
  );
};

export default EditSectionModal;
