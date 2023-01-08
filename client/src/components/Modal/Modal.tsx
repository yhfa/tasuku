import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Divider,
} from "@chakra-ui/react";

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
}> = (props) => {
  const { isOpen, onClose, title, children } = props;

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="bold">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Divider color="gray.200" mb="8" />
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};
export default Modal;
