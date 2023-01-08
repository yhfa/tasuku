import React, { useEffect, useContext, useMemo } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import {
  Button,
  IconButton,
  FormLabel,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { SuccessAlert, AlertError } from "src/components/Alerts";
import { Regex } from "src/constants/regex";
import Modal from "src/components/Modal/Modal";
import ModalInput from "src/components/Modal/ModalInput";
import ModalMenu from "src/components/Modal/ModalMenu";
import ModalMenuOption from "src/components/Modal/ModalMenuOption";
import ModalButton from "src/components/Modal/ModalButton";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import { EditProjectAPI } from "src/api/project/ProjectAPI";
import { ProjectContext } from "src/services/ProjectContext";

import {
  ButtonTypeEnum,
  Project as ProjectType,
  MemberRoleEnum,
  AddProjectInputs,
  ProjectActionKind,
} from "src/models/GlobalModules";
const { REACT_APP_API_BASE } = process.env;

const EditProjectModal: React.FC<{
  project: ProjectType;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  projectDispatch?: any;
}> = (props) => {
  const {
    project: { title, members, id },
    isOpen,
    setIsOpen,
    projectDispatch,
  } = props;
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectsResponse } = useContext(ProjectContext);

  const defaultValues = useMemo(
    (): AddProjectInputs => ({
      title,
      members: members.map((member) => ({
        email: member.email,
        role: member.role,
      })),
    }),
    [members, title]
  );

  const { register, handleSubmit, formState, control, reset } =
    useForm<AddProjectInputs>({
      mode: "onChange",
      defaultValues,
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const addMemberHandler = () =>
    append({ email: "", role: MemberRoleEnum.owner });
  const removerMemberHandler = (index: number) => remove(index);

  const {
    mutate: editProjectMutaion,
    status,
    error,
    data,
    isLoading,
    reset: resetMutaion,
  } = useMutation(EditProjectAPI);

  const onSubmit: SubmitHandler<AddProjectInputs> = async (
    data: AddProjectInputs
  ) => {
    data.members = data.members.filter((member) => member.email);
    editProjectMutaion({ data, projectId: id });
  };

  const { currentProjectId } = useParams<{ currentProjectId: string }>();
  useEffect(() => {

    if (status === "success") {
      const updatedTask: any = data?.data;

      if (currentProjectId === updatedTask.board._id) {
        projectDispatch({
          type: ProjectActionKind.editProject,
          payload: {
            title: updatedTask.board.title,
            members: updatedTask.board.members,
          },
        });
      }
      // BUG: doesn't load defaultValues
      reset(defaultValues);
      getProjectsResponse.refetch()
      SuccessAlert("Project has been Edited.");
      resetMutaion();
      setIsOpen(false);
    } else if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [
    projectId,
    data?.data,
    error,
    projectDispatch,
    reset,
    setIsOpen,
    status,
    getProjectsResponse,
    resetMutaion,
    defaultValues,
    currentProjectId,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        reset(defaultValues);
        setIsOpen(false);
      }}
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
        <ModalErrorMessage isVaild={!!formState.errors.title}>
          This field is required.
        </ModalErrorMessage>

        <FormLabel fontWeight="bold">
          Team Members (You could add them later)
        </FormLabel>
        {!fields.length && (
          <Button bg="transpernt" color="brand.200" onClick={addMemberHandler}>
            Add Now
          </Button>
        )}
        {fields.map((field, index) => (
          <VStack key={field.id} align="flex-start">
            <HStack>
              <ModalInput
                placeHolder="e.g sararose@tasuku.com"
                width="60%"
                registerFN={register}
                fieldName={`members.${index}.email`}
                registerOptions={{
                  pattern: Regex.email,
                  validate: async (value: string) => {
                    if (!value) return true;
                    try {
                      const res = await fetch(
                        `${REACT_APP_API_BASE}/user?email=${value}`
                      );
                      const data = await res.json();
                      return value === data.user.email;
                    } catch (err: any) {
                      return false;
                    }
                  },
                }}
              />

              <ModalMenu
                registerFN={register}
                fieldName={`members.${index}.role`}
                width="35%"
              >
                <ModalMenuOption value="owner">Owner</ModalMenuOption>
                <ModalMenuOption value="editor">Editor</ModalMenuOption>
                <ModalMenuOption value="viewer">Viewer</ModalMenuOption>
              </ModalMenu>

              <IconButton
                aria-label="Add Member"
                bg="transparent"
                icon={<AiOutlinePlus />}
                _hover={{ background: "transparent" }}
                onClick={addMemberHandler}
              />
              <IconButton
                aria-label="Delete Member"
                bg="transparent"
                icon={<MdOutlineDelete color="red" />}
                _hover={{ background: "transparent" }}
                onClick={removerMemberHandler.bind(null, index)}
              />
            </HStack>
            <ModalErrorMessage
              isVaild={
                !!(
                  formState.errors?.members &&
                  formState.errors?.members[index]?.email?.type === "validate"
                )
              }
            >
              No user for this email.
            </ModalErrorMessage>

            <ModalErrorMessage
              isVaild={
                !!(
                  formState.errors?.members &&
                  formState.errors?.members[index]?.email?.type === "pattern"
                )
              }
            >
              Please enter vaild email.
            </ModalErrorMessage>
          </VStack>
        ))}

        <ModalButton
          background="brand.700"
          backgroundOnHover="brand.100"
          disabled={!formState.isValid}
          type={ButtonTypeEnum.submit}
          isLoading={isLoading}
        >
          Edit Project
        </ModalButton>
      </form>
    </Modal>
  );
};

export default EditProjectModal;
