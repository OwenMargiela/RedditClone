import { Community } from "@/atoms/communitiesAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({communityData}) => {
  return (
    <Flex direction={"column"} width="100%" height="146px">
        Header
    </Flex>
  )
};
export default Header;
