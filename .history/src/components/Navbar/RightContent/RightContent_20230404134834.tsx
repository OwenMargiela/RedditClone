import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthButtons from "./AuthButtons";

type RightContentProps = {
  // user:any
};

const RightContent: React.FC<RightContentProps> = () => {
  return (
    <>
      <Flex justify={"center"} align={"center"}>
        <AuthButtons></AuthButtons>
      </Flex>
    </>
  );
};
export default RightContent;
