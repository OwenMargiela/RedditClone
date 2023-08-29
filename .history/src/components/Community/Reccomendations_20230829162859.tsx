import useCommunityData from "@/Hooks/useCommunityData";
import { Community } from "@/atoms/communitiesAtom";
import { firestore } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Reccomendations: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityReccomendations = async () => {
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data,
      }));

      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityReccomendations", error);
    }
  };
  useEffect(() => {
    getCommunityReccomendations();
  }, []);
  return (
    <>
      <Flex
        direction={"column"}
        bg={"white"}
        border={" 1px solid"}
        borderColor={"gray.300"}
      >
        <Flex
          align={"flex-end"}
          color={"whiteAlpha.100"}
          p={"6px 10px"}
          height={"70px"}
          borderRadius={"4px 4px 0px 0px"}
          fontWeight={700}
          bgImage={"url(/images/recCommsArt.png)"}
          backgroundSize={"cover"}
        >
          Top Communities
        </Flex>
        <Flex></Flex>
      </Flex>
    </>
  );
};
export default Reccomendations;
