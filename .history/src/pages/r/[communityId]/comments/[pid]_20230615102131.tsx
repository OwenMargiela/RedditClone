import usePosts from "@/Hooks/usePosts";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostItem";
import { auth, firestore } from "@/firebase/clientApp";
import { doc } from "@firebase/firestore";
import { getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const PostPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const { onDeletePost, onVote, setPostStateValue, postStateValue } =
    usePosts();
  const router = useRouter();

  const fetchPost = async (postID: string) => {
    try {
      const postDocRef = doc(firestore, "post", postID);
      const postDoc = await getDoc(postDocRef);
    } catch (error) {
      console.log("fetchPost error", error);
    }
  };
  useEffect(() => {
    const { pid } = router.query;
    if (pid && !postStateValue) {
      fetchPost(pid as string);
    }
  }, [router.query, postStateValue.selectedPost]);

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
