import CreateCommunityModal from "@/components/Modal/CreateCommunityModal/CreateCommunityModal";
import { Box, Flex, Icon, Image, MenuItem, Text } from "@chakra-ui/react";
import React from "react";
import { GrAdd } from "react-icons/gr";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { communityState } from "@/atoms/communitiesAtom";
import useCommunityData from "@/Hooks/useCommunityData";
import { FaReddit } from "react-icons/fa";
import MenuListItem from "./MenuListItem";
type CommunityProps = {};

const Community: React.FC<CommunityProps> = () => {
  const [open, setOpen] = useState(false);
  const { communityStateValue } = useCommunityData();
  const mySnippets = communityStateValue.mySnippets;
  const snip = useRecoilValue(communityState).mySnippets
  console.log(snip)
  // console.log("here are my snippets",communityStateValue)
  return (
    <>
      <CreateCommunityModal
        handleClose={() => setOpen(false)}
        open={open}
      ></CreateCommunityModal>
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          MY COMMUNITIES
        </Text>
        <MenuItem
          fontSize={"10pt"}
          _hover={{ bg: "gray.100" }}
          width={"100%"}
          onClick={() => setOpen(true)}
        >
          <Flex flexDirection={"row"}>
            <Icon as={GrAdd} fontSize={20} mr={2}></Icon>
            CreateCommunity
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet, i) => (
          // <Flex

          //   pl={3}
          //   pb={0.5}
          //   pt={2}
          //   cursor={"pointer"}
          //   _hover={{ backgroundColor: "gray.50" }}
          // >
          //   <Icon mr={2} color={"gray.500"} as={FaReddit}></Icon>
          //   <Text color={"gray.600"} fontSize={"9pt"}>
          //     {snippet.communityId}
          //   </Text>
          // </Flex>
          <MenuListItem
            imageURL={snippet.imageURL}
            iconColor="blue.500"
            icon={FaReddit}
            key={i}
            link={`/r/${snippet.communityId}`}
            displayText={`r/${snippet.communityId}`}
          ></MenuListItem>
        ))}
      </Box>
    </>
  );
};
export default Community;
