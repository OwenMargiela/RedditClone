import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Image, Text } from "@chakra-ui/react";

import { Flex, Icon, Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { TiHome } from "react-icons/ti";
import Community from "./Community";
import useDirectory from "@/Hooks/useDirectory";

const Directory: React.FC = () => {
  const { directoryState, toggleMenuOpen } = useDirectory();
  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        cursor={"pointer"}
        padding={"0px 6px"}
        borderRadius={4}
        mr={2}
        ml={{ base: 0, md: 2 }}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          alignItems={"center"}
          justify={"space-between"}
          width={{ base: "auto", lg: "200px" }}
        >
          <Flex align={"center"} justifyContent={"center"}>
            <Flex
              align={"center"}
              justifyContent={"center"}
              display={{ base: "none", lg: "flex" }}
            >
              {directoryState.selectedMenuItem.imageURL ? (
                <Image
                  h={"15pt"}
                  w={"15pt"}
                  mr={2}
                  borderRadius={'full'}
                  src={directoryState.selectedMenuItem.imageURL}
                ></Image>
              ) : (
                <Icon mr={2} fontSize={24} as={TiHome}></Icon>
              )}

              {directoryState.selectedMenuItem.displayText}
            </Flex>
          </Flex>
          <ChevronDownIcon color={"gray.500"}></ChevronDownIcon>
        </Flex>
      </MenuButton>

      <MenuList>
        <Community></Community>
      </MenuList>
    </Menu>
  );
};
export default Directory;
