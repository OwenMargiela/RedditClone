import { authModalState } from "@/atoms/authModalAtom";
import { Community, communityState } from "@/atoms/communitiesAtom";
import About from "@/components/Community/About";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { auth, firestore } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import router from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);

  const [communityStateValue, setCommunitySateValue] =
    useRecoilState(communityState);
  console.log("Community", communityStateValue);
  const setAuthModalState = useSetRecoilState(authModalState);
  useEffect(() => {
    const getCommunityData = async (communityId: string) => {
      console.log("getting Community");
      try {
        const communityDocRef = doc(firestore, "communities", communityId);
        const communityDoc = await getDoc(communityDocRef);
        setCommunitySateValue((prev) => ({
          ...prev,
          currentCommunity: {
            id: communityDoc.id,
            ...communityDoc.data(),
          } as Community,
        }));
      } catch (error) {
        console.log("getCommunityData error", error);
      }
    };
    const { communityId } = router.query;
    if (communityId && !communityStateValue.currentCommunity) {
      getCommunityData(communityId as string);
    }
  }, [router.query, communityStateValue.currentCommunity]);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom={"1px solid white"}>
          <Text>Create a Post</Text>
        </Box>
        {!user && setAuthModalState({ open: true, view: "login" })}
        {user && <NewPostForm user={user}></NewPostForm>}
      </>
      <>
        <>
          {communityStateValue.currentCommunity && (
            <About communityData={communityStateValue.currentCommunity}></About>
          )}
        </>
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
