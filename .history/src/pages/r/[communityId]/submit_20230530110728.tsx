import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Post/NewPostForm";
import { Box,Text } from "@chakra-ui/react";
import React from "react";

const SubmitPostPage: React.FC = () => {
  return (
    <PageContent>
      <>
      <Box p="14px 0px" borderBottom={"1px solid white"}>
        <Text>
            Create a Post
        </Text>
      </Box>
      <NewPostForm></NewPostForm>

      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
