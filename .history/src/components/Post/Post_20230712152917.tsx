import usePosts from "@/Hooks/usePosts";
import { Community } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { Stack } from "@chakra-ui/react";
import { Post } from "@/atoms/postsAtom";
import PostLoader from "./PostLoader";

type PostProps = {
  communityData: Community;
};

const Post: React.FC<PostProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePosts();
  const getPosts = async () => {
    setLoading(true)
    try {
      const postQuery = query(
        collection(firestore, "post"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as unknown as Post[],
      }));
      console.log(posts);
    } catch (error: any) {
      console.log("getPost error", error.message);
    }
    setLoading(false)
  };
  useEffect(() => {
    getPosts();
  }, [communityData]);
  return (
    <>
      {loading ? (
        <PostLoader></PostLoader>
      ) : (
        <Stack>
          {postStateValue.posts.map((item, i) => (
            <PostItem
              key={i}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={postStateValue.postVotes.find(vote => vote.postId === item.id)?.voteValue}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onvote={onVote}
            ></PostItem>
          ))}
        </Stack>
      )}
    </>
  );
};
export default Post;
