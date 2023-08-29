import { Flex, Button, Text } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./userMenu";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal></AuthModal>
      <Flex justify={"center"} align={"center"}>
        {user ? <Icons></Icons> : <AuthButtons></AuthButtons>}
        <UserMenu></UserMenu>
      </Flex>
    </>
  );
};
export default RightContent;
