import { DirectoryMenuItem, DirectoryMenuState } from "@/atoms/directoryMenuAtoms";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";

const useDirectory = () => {
  const [directoryState, setDirectoryState] =
    useRecoilState(DirectoryMenuState);
    const router = useRouter()

  const onselectMenuItem = (menuItem:DirectoryMenuItem) =>{
    setDirectoryState((prev) => ({
        ...prev,
        selectedMenuItem:menuItem
    }))
    router.push(menuItem.link)
    if(directoryState.isOpen){
        toggleMenuOpen()
    }


  }  

  const toggleMenuOpen = () => {
    setDirectoryState((prev) => ({
      ...prev,
      isOpen: !directoryState.isOpen,
    }));
  };

  return { directoryState, toggleMenuOpen, onselectMenuItem };
};
export default useDirectory;
