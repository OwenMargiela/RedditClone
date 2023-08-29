import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal></AuthModal>
      <Flex justify={"center"} align={"center"}>
        {user ? (
          <>
            <Button
              cursor={"not-allowed"}
              variant={"outline"}
              mr={2}
              fontSize={"12pt"}
            >
              IN
            </Button>
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
