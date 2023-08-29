import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Login from "./Login";

type AutnInputsProps = {};

const AutnInputs: React.FC<AutnInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction={"column"} align={"center"} width={"100%"} mt={4}>
      {modalState.view === "login" && <Login></Login>}
      {/* {modalState.view === "login" && <SignUp></SignUp>} */}
    </Flex>
  );
};
export default AutnInputs;
