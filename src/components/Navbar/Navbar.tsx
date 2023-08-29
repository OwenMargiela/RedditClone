import React from "react";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import Directory from "./Directory/Directory";
import UserMenu from "./RightContent/UserMenu";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import Community from "./Directory/Community";
import useDirectory from "@/Hooks/useDirectory";
import { defaultMenuItem } from "@/atoms/directoryMenuAtoms";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onselectMenuItem } = useDirectory();
  return (
    <Flex
      bg={"white"}
      height={"44px"}
      padding={"6px 12px"}
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align={"center"}
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
      >
        <Image
          onClick={() => onselectMenuItem(defaultMenuItem)}
          cursor={"pointer"}
          src="/images/redditFace.svg"
          mr={1}
          height={"30px"}
        ></Image>
        <Image
          onClick={() => onselectMenuItem(defaultMenuItem)}
          cursor={"pointer"}
          src="/images/redditText.svg"
          height={"46px"}
          display={{ base: "none", md: "unset" }}
        ></Image>
      </Flex>
      {user && <Directory></Directory>}
      <SearchInput user={user} />
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
