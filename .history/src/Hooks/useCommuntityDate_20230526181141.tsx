import { communityState } from "@/atoms/communitiesAtom";
import React from "react";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [communityStateValue, setCommunitySateValue] =
    useRecoilState(communityState);
  const joinCommunity = () => {};
  const leaveCommunity = () => {};
  return {
    communityStateValue,
    joinCommunity,
    leaveCommunity,
  };
};
export default useCommunityData;
