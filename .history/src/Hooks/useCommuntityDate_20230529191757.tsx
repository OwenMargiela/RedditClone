import {
  Community,
  CommunitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
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
    setLoading(true);
    try {
      const snippetDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippet`)
      );

      const snippets = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
      setCommunitySateValue((prev) => ({
        ...prev,
        mySnippets: snippets as CommunitySnippet[],
      }));
      //   console.log("Your snippets are",snippets);
      //   console.log("User is",user)
    } catch (error) {
      console.log("getMySnippets error", error);
    }
    setLoading(false);
  };
  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);
      const newSinnpet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityData.id),
        newSinnpet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMemebers: increment(1),
      });

      setCommunitySateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSinnpet],
      }));

      await batch.commit();
    } catch (error: any) {
      console.log("joinCommunity error", error);
      setError(error.message);
    }
  };
  const leaveCommunity = async (communityId: string) => {
    try {
      const batch = writeBatch(firestore);
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityId)
      );
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMemebers: increment(-1),
      });
      await batch.commit();
      setCommunitySateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (item) => item.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
