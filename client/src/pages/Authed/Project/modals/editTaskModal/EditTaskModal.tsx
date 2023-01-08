import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormLabel, HStack, VStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { SuccessAlert, AlertError } from "src/components/Alerts";
import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import ModalInput from "src/components/Modal/ModalInput";
import ModalMenu from "src/components/Modal/ModalMenu";
import ModalMenuOption from "src/components/Modal/ModalMenuOption";
import { EditTaskAPI } from "src/api/task/TaskAPI";
import {
  TaskStateEnum,
  Task as TaskType,
  ProjectActionKind,
  ButtonTypeEnum,
} from "src/models/GlobalModules";
import "src/pages/Authed/Project/modals/addTaskModal/style.scss";

const EditTaskModal: React.FC<{
  task: TaskType;
  sectionTitle: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectDispatch: any;
}> = (props) => {
  const {
    task: { from, to, title, _id, state },
    sectionTitle,
    isOpen,
    setIsOpen,
    projectDispatch,
  } = props;

  type TaskInputs = {
    description: string;
    state: TaskStateEnum[];
  };

  const [startDate, setStartDate] = useState(new Date(from));
  const [endDate, setEndDate] = useState(new Date(to));
  const { register, handleSubmit, formState, reset } = useForm<TaskInputs>({
    mode: "onChange",
  });


  const {
    mutate: editTaskMutaion,
    status,
    error,
    data,
    isLoading,
  } = useMutation(EditTaskAPI);


  const onSubmit: SubmitHandler<TaskInputs> = async (formData: TaskInputs) => {
    const taskData = Object.assign({}, formData, {
      to: endDate,
      from: startDate,
    });
    editTaskMutaion({ data: taskData, taskId: _id });
  };

  useEffect(() => {
    if (status === "success") {
      const updatedTask: any = data?.data;
      projectDispatch({
        type: ProjectActionKind.editTask,
        payload: { updatedTask, columnTitle: sectionTitle },
      });
      reset();
      SuccessAlert("Task has been Edited.");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [
    data?.data,
    error,
    projectDispatch,
    reset,
    sectionTitle,
    setIsOpen,
    status,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title={`Edit ${title}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          placeHolder="e.g Design UI/UX,Test App or Deploy to server"
          label="Name"
          registerFN={register}
          fieldName="title"
          registerOptions={{ required: true }}
          defaultValue={title}
        />
        <ModalErrorMessage isVaild={!!formState.errors.description}>
          This field is required.
        </ModalErrorMessage>

        <FormLabel fontWeight="bold">Status</FormLabel>

        <ModalMenu
          registerFN={register}
          fieldName="state"
          width="35%"
          defaultValue={state}
        >
          <ModalMenuOption value={TaskStateEnum.started}>
            Started
          </ModalMenuOption>
          <ModalMenuOption value={TaskStateEnum.inProgress}>
            In Progress
          </ModalMenuOption>
          <ModalMenuOption value={TaskStateEnum.done}>Done</ModalMenuOption>
          <ModalMenuOption value={TaskStateEnum.overDue}>
            Over due
          </ModalMenuOption>
        </ModalMenu>

        <HStack justifyContent={"space-between"} maxW={"18rem"} mt="2">
          <VStack align="flex-start">
            <FormLabel fontWeight="bold">From</FormLabel>

            <DatePicker
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </VStack>
          <VStack w={"4rem"} align="flex-start">
            <FormLabel fontWeight="bold">To</FormLabel>

            <DatePicker
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
            />
          </VStack>
        </HStack>

        <ModalButton
          background="brand.700"
          backgroundOnHover="brand.100"
          disabled={!formState.isValid}
          type={ButtonTypeEnum.submit}
          isLoading={isLoading}
        >
          Edit Task
        </ModalButton>
      </form>
    </Modal>
  );
};

export default EditTaskModal;
