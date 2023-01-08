import React, { useContext } from "react";
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
import { useHistory } from "react-router-dom";

import { Regex } from "src/constants/regex";
import Modal from "src/components/Modal/Modal";
import ModalInput from "src/components/Modal/ModalInput";
import ModalMenu from "src/components/Modal/ModalMenu";
import ModalMenuOption from "src/components/Modal/ModalMenuOption";
import ModalButton from "src/components/Modal/ModalButton";
import ModalErrorMessage from "src/components/Modal/ModalErrorMessage";
import { ProjectContext } from "src/services/ProjectContext";

import {
  ButtonTypeEnum,
  MemberRoleEnum,
  AddProjectInputs,
} from "src/models/GlobalModules";

const { REACT_APP_API_BASE } = process.env;

const AddProject: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}> = (props) => {
  const { register, handleSubmit, formState, control } =
    useForm<AddProjectInputs>({
      mode: "onChange",
    });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });
  const addMemberHandler = () =>
    append({ email: "", role: MemberRoleEnum.owner });
  const removerMemberHandler = (index: number) => remove(index);

  const { getProjectsResponse, createBoardMutation } =
    useContext(ProjectContext);
  let history = useHistory();

  const onSubmit: SubmitHandler<AddProjectInputs> = async (
    data: AddProjectInputs
  ) => {
    data.members = data.members.filter((member) => member.email);
    await createBoardMutation.mutate({ ...data, history });
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={() => props.setIsOpen(false)}
      title="Add a New Project"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalInput
          placeHolder="e.g Design UI/UX,Test App or Deploy to server"
          label="Name"
          registerFN={register}
          fieldName="title"
          registerOptions={{ required: true }}
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
          isLoading={
            createBoardMutation.isLoading || getProjectsResponse.isLoading
          }
          background="brand.700"
          backgroundOnHover="brand.100"
          disabled={!formState.isValid}
          type={ButtonTypeEnum.submit}
        >
          Create Project
        </ModalButton>
      </form>
    </Modal>
  );
};

export default AddProject;
