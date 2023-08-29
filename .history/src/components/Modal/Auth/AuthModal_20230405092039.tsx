import { authModalState } from "@/atoms/authModalAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";

const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const handleClose = () => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };
  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
          <ModalCloseButton />
          <OAuthButtons  ></OAuthButtons>
            {modalState.view === "login" && "Login"}
            {modalState.view === "signup" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            mb={1}
          >
            <Flex
              direction={"column"}
              align={"center"}
              justify={"center"}
              border={"1px solid red"}
            ></Flex>
            <AuthInputs></AuthInputs>

          </ModalBody>

          
        </ModalContent>
      </Modal>
    </>
  );
};
export default AuthModal;
