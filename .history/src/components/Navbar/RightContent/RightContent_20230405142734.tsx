import { Flex, Button,Text } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

type RightContentProps = {
  user: any;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal></AuthModal>
      <Flex justify={"center"} align={"center"}>
        {user ? (
          <>
          <Text  mr={2} fontSize={"9pt"}>
            {user.email.slice(0,1).toUpperCase()}
          </Text>
          <Button onClick={() => signOut(auth)}>Log Out</Button>
          </>
        ) : (
          <AuthButtons></AuthButtons>
        )}
      </Flex>
    </>
  );
};
export default RightContent;
