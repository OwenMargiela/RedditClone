import { Post, postState } from "@/atoms/postsAtom";
import { storage } from "@/firebase/clientApp";
import { ref } from "firebase/storage";
import React from "react";
import { useRecoilState } from "recoil";

const usePosts = () => {
  const [postStateValue, setPostStateValue] = useRecoilState(postState);

  const onVote = async () => {};
  const onSelectPost = () => {};
  const onDeletePost = async (post: Post):Promise<boolean> => {

    try {
      if(post.imageURL){
        // const imageRef = ref(storage,`posts/${post.id}/image`)
      }
      
      return true
    } catch (error) {
      return false
    }
  };

  return {
    postStateValue,
    setPostStateValue,
    onVote,
    onDeletePost,
    onSelectPost,
  };
};
export default usePosts;
