import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom={"1px solid white"}>
          <Text>Create a Post</Text>
        </Box>
        {user && <NewPostForm user={user}></NewPostForm>}
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
