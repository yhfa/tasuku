import { Heading, HStack } from "@chakra-ui/react";
import Modal from "src/components/Modal/Modal";
import ModalButton from "src/components/Modal/ModalButton";
import { AlertError, SuccessAlert } from "src/components/Alerts";
import { ButtonTypeEnum } from "src/models/GlobalModules";
import { getLocalStoredData } from "src/_helpers/_localStorage";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import { useMutation } from 'react-query';
import { useEffect, useContext } from "react";
import { DeleteUserAPI } from './../../../api/user/UserAPI';
import { AuthenticationContext } from "src/services/AuthContext";
import { useHistory } from 'react-router-dom';

const DeleteUserModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

}> = (props) => {
  const { isOpen, setIsOpen } = props;
  const user = getLocalStoredData(ConstLocalStorage.user);
  const userName = user.name.split(",")

  const { logout } = useContext(AuthenticationContext);
  let history = useHistory()

  const {
    mutate: deleteUserMutaion,
    status,
    error,
    isLoading
  } = useMutation(DeleteUserAPI);

  useEffect(() => {
    if (status === "success") {

      SuccessAlert("User has been deleted");
      setIsOpen(false);
      logout()
      history.push('/');

    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [status, error, setIsOpen, history, logout]);

  const deleteUserHandler = () => {
    deleteUserMutaion()
  };

  const closeModalHandler = () => setIsOpen(false);


  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModalHandler}
      title="You are about to delete you account"
    >
      <Heading as="p" size="md" fontWeight="500" mb="4">
        <>
          <span style={{ fontSize: "1rem", fontWeight: "700", color: "red" }}>NOTE: You will lose all data permanently<br /><br /></span>
          Delete <span style={{ fontWeight: "700", fontStyle: "italic" }}>"{userName}"</span>?
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
          isLoading={isLoading}
          disabled={isLoading}
          width="30%"
          background="red.600"
          backgroundOnHover="red.500"
          type={ButtonTypeEnum.button}
          onClick={deleteUserHandler}
        >
          Delete
        </ModalButton>
      </HStack>
    </Modal>
  );
};

export default DeleteUserModal;
