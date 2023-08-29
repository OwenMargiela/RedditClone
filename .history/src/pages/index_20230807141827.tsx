import usePosts from "@/Hooks/usePosts";
import { Post } from "@/atoms/postsAtom";
import CreatePostLink from "@/components/Community/CreatePostLink";
import PageContent from "@/components/Layout/PageContent";
import PostItem from "@/components/Post/PostItem";
import PostLoader from "@/components/Post/PostLoader";
import { auth, firestore } from "@/firebase/clientApp";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const buildUserHomeFeed = () => {};
  const {postStateValue, setPostStateValue, onSelectPost,onDeletePost,onVote } = usePosts();

  const buildNoUserHomeFeed = async () => {
    setLoading(true);

    try {
      const postQuery = query(
        collection(firestore, "post"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed error", error);
    }

    setLoading(false);
  };

  const getUserPostVotes = () => {};

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser]);

  return (
    <>
      <PageContent>
        <>
        <CreatePostLink></CreatePostLink>
        {loading ? (
        <PostLoader></PostLoader>
      ) : (
        <Stack>
          {postStateValue.posts.map((post, i) => (
            <PostItem
              key={i}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVoteValue={postStateValue.postVotes.find(vote => vote.postId === post.id)?.voteValue}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onvote={onVote}
              homePage={true}
            ></PostItem>
          ))}
        </Stack>
      )}</>
        <></>
      </PageContent>
    </>
  );
}
