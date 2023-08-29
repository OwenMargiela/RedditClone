import { Community, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCommunitySateValue] =
    useRecoilState(communityState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isjoined: boolean
  ) => {
    if (isjoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };
  const getMySnippets = async () => {
    setLoading(true)
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippet`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      console.log("Your snippets are",snippets);
    } catch (error) {
      console.log("getMySnippets error", error);
    }
  };
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};

  useEffect(() =>{
    if(!user) return
    getMySnippets()
  },[user])
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
