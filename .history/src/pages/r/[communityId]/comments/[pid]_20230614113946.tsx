import usePosts from "@/Hooks/usePosts";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostItem";
import { auth } from "@/firebase/clientApp";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onDeletePost, onVote, setPostStateValue, postStateValue } =
    usePosts();

  return (
    <PageContent>
      <>
        {postStateValue.selectedPost && (
          <PostItem
            onDeletePost={onDeletePost}
            post={postStateValue.selectedPost}
            onvote={onVote}
            userVoteValue={
              postStateValue.postVotes.find(
                (item) => item.postId === postStateValue.selectedPost?.id
              )?.voteValue
            }
            userIsCreator={user?.uid === postStateValue.selectedPost?.creatorId}
          ></PostItem>
        )}
      </>
      <></>
    </PageContent>
  );
};
export default PostPage;
