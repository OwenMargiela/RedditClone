import { Post } from "@/atoms/postsAtom";
import { Box, Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { EOF } from "dns";
import { Timestamp, writeBatch } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

type CommentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

export type Comment = {
  id:String
  creatorId:string
  creatorDisplayText:string
  communityId:string
  postId:string
  postTitle:string
  text:string
  createdAt:Timestamp
}

const Comments: React.FC<CommentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const onCreateComment = async (commentText: string) => {

    try {
      const batch = writeBatch(firestore)

      
    } catch (error) {
      console.log("onCreateComment error", error)
      
    }

  };
  const onDeleteComment = async (comment: any) => {};
  const getPostComments = async () => {};

  useEffect(() => {
    getPostComments();
  });

  return (
    <Box bg={"white"} borderRadius={"0px 0px 4px 4px"} padding={2}>
      <Flex
        direction={"column"}
        pl={10}
        pr={4}
        mb={6}
        fontSize={"10pt"}
        width={`100%`}
      >
        <CommentInput
          commentText={commentText}
          setCommentText={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        ></CommentInput>
      </Flex>
    </Box>
  );
};
export default Comments;
