import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormLabel, HStack, VStack } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AddTaskAPI } from "src/api/task/TaskAPI";
import { SuccessAlert, AlertError } from "src/components/Alerts";
import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import ModalInput from "src/components/Modal/ModalInput";
import ModalMenu from "src/components/Modal/ModalMenu";
import ModalMenuOption from "src/components/Modal/ModalMenuOption";
import { TaskStateEnum } from "src/models/GlobalModules";
import { ProjectActionKind, ButtonTypeEnum } from "src/models/GlobalModules";
import "./style.scss";

const AddTaskModal: React.FC<{
  projectId: string;
  sectionTitle: string;
  numberOfTasks: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectDispatch: any;
}> = (props) => {
  const {
    projectId,
    sectionTitle,
    numberOfTasks,
    isOpen,
    setIsOpen,
    projectDispatch,
  } = props;
  type TaskInputs = {
    description: string;
    state: TaskStateEnum[];
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { register, handleSubmit, formState, getValues, reset } =
    useForm<TaskInputs>({
      mode: "onChange",
    });

  const {
    mutate: addTaskMutaion,
    status,
    error,
    data,
    isLoading,
  } = useMutation(AddTaskAPI);

  const onSubmit: SubmitHandler<TaskInputs> = async (formData: TaskInputs) => {
    const taskData = Object.assign({}, formData, {
      boardId: projectId,
      columnTitle: sectionTitle,
      to: endDate,
      from: startDate,
      position: numberOfTasks,
    });
    addTaskMutaion({ data: taskData });
  };

  useEffect(() => {
    if (status === "success") {
      const task: any = data?.data;
      projectDispatch({
        type: ProjectActionKind.addTask,
        payload: {
          ...getValues(),
          from: startDate,
          to: endDate,
          columnTitle: sectionTitle,
          position: task.position,
          _id: task._id,
        },
      });
      reset();
      SuccessAlert("Task has been added.");
      setIsOpen(false);
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [
    data?.data,
    endDate,
    error,
    getValues,
    projectDispatch,
    reset,
    sectionTitle,
    setIsOpen,
    startDate,
    status,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Add a New Task"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          placeHolder="e.g Design UI/UX,Test App or Deploy to server"
          label="Name"
          registerFN={register}
          fieldName="title"
          registerOptions={{ required: true }}
        />
        <ModalErrorMessage isVaild={!!formState.errors.description}>
          This field is required.
        </ModalErrorMessage>

        <FormLabel fontWeight="bold">Status</FormLabel>

        <ModalMenu registerFN={register} fieldName="state" width="35%">
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
          Create Task
        </ModalButton>
      </form>
    </Modal>
  );
};

export default AddTaskModal;
