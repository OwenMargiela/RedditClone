import { postState } from '@/atoms/postsAtom';
import React from 'react';
import { useRecoilState } from 'recoil';



const usePosts:React.FC = () => {
    const [postStateValue, setPostStateValue] = useRecoilState(postState)
    
    const onVote =async () => {
        
    }
    const onSelectPost =async () => {
        
    }
    const onDeletePost =async () => {
        
    }

    return {
        postStateValue,
        setPostStateValue,
    }
}
export default usePosts;