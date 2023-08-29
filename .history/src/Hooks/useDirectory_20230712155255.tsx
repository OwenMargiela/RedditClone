import { communityState } from "@/atoms/communitiesAtom";
import {
  DirectoryMenuItem,
  DirectoryMenuState,
} from "@/atoms/directoryMenuAtoms";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaReddit } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";

const useDirectory = () => {
    const communityStateValue = useRecoilValue(communityState)
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);
  const router = useRouter();

  const onselectMenuItem = (menuItem: DirectoryMenuItem) => {
    setDirectoryState((prev) => ({
      ...prev,
      selectedMenuItem: menuItem,
    }));
    router.push(menuItem.link);
    if (directoryState.isOpen) {
      toggleMenuOpen();
    }
  };

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };


  useEffect(() => {
    const {currentCommunity} = communityStateValue

    if{currentCommunity}{
        setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem:{displayText:`r/${currentCommunity?.id}`, link:`/r/${currentCommunity?.creatorId}`,imageURL: currentCommunity?.imageURL, icon:FaReddit, iconColor:'brand.500'}
        }))
    }

  },[communityStateValue.currentCommunity])

  return { directoryState, toggleMenuOpen, onselectMenuItem };
};
export default useDirectory;
