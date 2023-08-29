import { ChevronDownIcon } from "@chakra-ui/icons";

import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Icon,
  Flex,
  MenuDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { User, signOut } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const resetCommunityState = useResetRecoilState(communityState)
  const setAuthModalState = useSetRecoilState(authModalState);
  const logout = async() =>{
    await signOut(auth);
    resetCommunityState()
  }
  return (
    <Menu>
      <MenuButton
        cursor={"pointer"}
        padding={"6px 6px"}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
      >
        <Flex alignItems={"center"}>
          <Flex align={"center"}>
            {user ? (
              <>
                <Icon
                  as={FaRedditSquare}
                  mr={1}
                  color={"gray.500"}
                  fontSize={24}
                ></Icon>
                <Flex
                  direction={"column"}
                  display={{ base: "none", lg: "flex" }}
                  fontSize={"8pt"}
                  align={"flex-start"}
                  mr={8}
                >
                  <Text>{ user?.displayName || user?.email?.split("@")[0]}</Text>
                  <Flex>
                    <Icon as={IoSparkles} color={"brand.100"} mr={1}></Icon>
                    <Text color={"gray.400"}>1 karma</Text>
                  </Flex>
                </Flex>
              </>
            ) : (
              <Icon
                as={VscAccount}
                fontSize={24}
                color={"gray.400"}
                mr={1}
              ></Icon>
            )}
            <ChevronDownIcon></ChevronDownIcon>
          </Flex>
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align={"center"}>
                <Icon mr={2} fontSize={20} as={CgProfile}></Icon>
                Profile
              </Flex>
            </MenuItem>
            <MenuDivider></MenuDivider>
            <MenuItem
              fontSize={"10pt"}
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={logout}
            >
              <Flex align={"center"}>
                <Icon mr={2} fontSize={20} as={MdOutlineLogin}></Icon>
                Log Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <MenuItem
            fontSize={"10pt"}
            fontWeight={700}
            _hover={{ bg: "blue.500", color: "white" }}
            onClick={() => setAuthModalState({ open: true, view: "login" })}
          >
            <Flex align={"center"}>
              <Icon mr={2} fontSize={20} as={MdOutlineLogin}></Icon>
              Log Out / Sign Up
            </Flex>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};
export default UserMenu;
