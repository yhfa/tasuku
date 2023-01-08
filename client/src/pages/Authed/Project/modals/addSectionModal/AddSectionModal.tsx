import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "react-query";

import Modal from "src/components/Modal/Modal";
import ModalInput from "src/components/Modal/ModalInput";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import ModalButton from "src/components/Modal/ModalButton";
import { AddSectionAPI } from "src/api/section/SectionAPI";
import {
  ProjectActionKind,
  ButtonTypeEnum,
} from "src/models/GlobalModules/index";
import { AlertError, SuccessAlert } from "src/components/Alerts";

const AddSectionModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectId: string;
  projectDispatch: any;
}> = (props) => {
  const { isOpen, setIsOpen, projectId, projectDispatch } = props;
  type Inputs = {
    title: string;
  };
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<Inputs>({
      mode: "onChange",
    });

  const {
    mutate: addSectionMutaion,
    status,
    error,
    isLoading,
  } = useMutation(AddSectionAPI);

  useEffect(() => {
    if (status === "success") {
      projectDispatch({
        type: ProjectActionKind.addSection,
        payload: getValues(),
      });
      reset();
      SuccessAlert("Section has been added");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [error, getValues, projectDispatch, reset, setIsOpen, status]);

  const onSubmit: SubmitHandler<Inputs> = (formData: Inputs) => {
    addSectionMutaion({ data: formData, projectId: projectId });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add a New Section"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          placeHolder="e.g ToDo, Ideas, etc.."
          label="Name"
          registerFN={register}
          fieldName="title"
          registerOptions={{ required: true }}
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
          Create Section
        </ModalButton>
      </form>
    </Modal>
  );
};

export default AddSectionModal;
