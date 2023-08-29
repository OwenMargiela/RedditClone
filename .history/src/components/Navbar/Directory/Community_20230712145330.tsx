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
import { Snippet } from "next/font/google";
type CommunityProps = {};

const Community: React.FC<CommunityProps> = () => {
  const [open, setOpen] = useState(false);
  const { communityStateValue } = useCommunityData();
  const mySnippets = communityStateValue.mySnippets;

  // console.log("here are my snippets",communityStateValue)
  return (
    <>
      <CreateCommunityModal
        handleClose={() => setOpen(false)}
        open={open}
      ></CreateCommunityModal>
        <Flex  mt={3} mb={4} flexDirection={"row"}>
          <Icon as={GrAdd} fontSize={20} mr={2}></Icon>
          CreateCommunity
        </Flex>
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
        </MenuItem>
        {mySnippets.map((snippet, i) => (
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
      <Box mt={3} mb={4}>
        <Text
          pl={3}
          mb={1}
          fontSize={"7pt"}
          fontWeight={500}
          color={"gray.500"}
        >
          Moderating
        </Text>
        <MenuItem
          fontSize={"10pt"}
          _hover={{ bg: "gray.100" }}
          width={"100%"}
          onClick={() => setOpen(true)}
        >
          
        </MenuItem>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet, i) => (
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
