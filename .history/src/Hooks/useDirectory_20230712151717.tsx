import { DirectoryMenuState } from '@/atoms/directoryMenuAtoms';
import React from 'react';
import { useRecoilState } from 'recoil';



const useDirectory= () => {
    const [directoryState,setDirectoryState] = useRecoilState(DirectoryMenuState)
    
    return {directoryState}
}
export default useDirectory;