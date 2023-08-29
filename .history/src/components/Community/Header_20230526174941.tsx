import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { doc } from "firebase/firestore";
import React, { useState } from "react";
import { FaReddit } from "react-icons/fa";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const [isjoined, setIsJoined] = useState(false);
  const [error,setError] = useState("")
  
  const handleJoinAndExitCommunity = () =>{
      
      try {
        const communityDocRef = doc(firestore,"communities",communityData.id)
        setIsJoined(!isjoined)
        
    } catch (error:any) {
        console.log("HandlejoinCommunityError")
        setError(error)
    }

    
  }
  return (
    <Flex direction={"column"} width="100%" height="146px">
      <Box height={"50%"} bg={"blue.500"} />
      <Flex justify={"center"} bg={"white"} flexGrow={1}>
        <Flex width={"95%"} maxWidth={"860px"}>
          {communityData.imageURL ? (
            <Image></Image>
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
              variant={isjoined ? "outline" : "solid"}
              onClick={handleJoinAndExitCommunity}
            >
              {isjoined ? "Joined" : "Join"}
            </Button>
            <Text paddingLeft={5} color={"red.500"} fontSize={"9pt"}>
                dfko
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Header;
