import { Flex, Icon, Image, MenuItem } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons/lib";

type MenuListItemProps = {
  displayText: String;
  link: string;
  icon: IconType;
  iconColor: string;
  imageURL?: string;
};

const MenuListItem: React.FC<MenuListItemProps> = ({
  displayText,
  link,
  icon,
  iconColor,
  imageURL,
}) => {
  return (
    <>
      <MenuItem
        width={"100%"}
        fontSize={"10pt"}
        _hover={{ bg: "gray.100" }}
        onClick={() => {}}
      >
        <Flex align={"center"}>
          {imageURL ? (
            <Image src={imageURL} borderRadius={"full"}></Image>
          ) : (
            <Icon as={icon} fontSize={20} mr={2} color={iconColor}></Icon>
          )}
          {displayText}
        </Flex>
      </MenuItem>
    </>
  );
};
export default MenuListItem;
