import { Community } from "@/atoms/communitiesAtom";
import { Box, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  return (
    <Flex direction={"column"} width="100%" height="146px">
      <Box height={"50%"} bg={"blue.500"} />
      <Flex justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"860px"} >
          <Icon
            as={FaReddit}
            fontSize={64}
            position={"relative"}
            top={0}
            border={"4px solid white"}
            borderRadius={"999px"}
          ></Icon>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
