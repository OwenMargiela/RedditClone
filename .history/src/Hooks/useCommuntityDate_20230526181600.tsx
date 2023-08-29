import { Community, communityState } from "@/atoms/communitiesAtom";
import React from "react";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [communityStateValue, setCommunitySateValue] =
    useRecoilState(communityState);

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
  const joinCommunity = (communityData: Community) => {};
  const leaveCommunity = (communityId: string) => {};
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
  };
};
export default useCommunityData;
