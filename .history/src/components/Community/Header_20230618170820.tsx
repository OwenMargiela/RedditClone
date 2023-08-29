import useCommunityData from "@/Hooks/useCommunityData";

import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity,loading } = useCommunityData();
  

  const isJoined = !!communityStateValue.mySnippets.find(
    (item:any) => item.communityId === communityData.id
  );
  console.log("hey are your snipps",communityStateValue.mySnippets)
  return (
    <Flex direction={"column"} width="100%" height="146px">
      <Box height={"50%"} bg={"blue.500"} />
      <Flex justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"860px"}>
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image 
            borderRadius={'full'}
            boxSize={"66px"}
            alt="Community Image"
            position={"relative"}
            top={-3}
            color={"blue.500"}
            border={"4px solid white"}
            src={communityStateValue.currentCommunity?.imageURL }></Image>
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              position={"relative"}
              top={-3}
              border={"4px solid white"}
              borderRadius={"50%"}
              color={"blue.500"}
            ></Icon>
          )}

          <Flex padding={"10px 16px"}>
            <Flex direction={"column"} mr={6}>
              <Text fontWeight={800} fontSize={"16pt"}>
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize={"10pt"} color={"gray.400"}>
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              paddingLeft={6}
              paddingRight={6}
              height={"30px"}
              variant={isJoined ? "outline" : "solid"}
              isLoading={loading}
              onClick={() => {
                onJoinOrLeaveCommunity(communityData, isJoined);
              }}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
