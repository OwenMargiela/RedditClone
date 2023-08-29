import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communitiesAtom";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState)
  console.log("Community",communityStateValue)
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom={"1px solid white"}>
          <Text>Create a Post</Text>
        </Box>
        {!user && setAuthModalState({ open: true, view: "login" })}
        {user && <NewPostForm user={user}></NewPostForm>}
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
