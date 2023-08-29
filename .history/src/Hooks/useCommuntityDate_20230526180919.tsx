import { communityState } from '@/atoms/communitiesAtom';
import React from 'react';
import { useRecoilState } from 'recoil';



const useCommunityData:React.FC = () => {
    const [communityStateValue,setCommunitySateValue] = useRecoilState(communityState)
    
    return <div>Have a good coding</div>
}
export default useCommunityData;