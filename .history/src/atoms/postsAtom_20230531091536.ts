import { Timestamp } from "firebase/firestore";
import {atom} from "recoil"

export type Post = {
    communityId:string;
    creatorId:string;
    creatorDisplayName:string;
    title:string;
    body:string;
    numberOfComments:number;
    voteStatus:number;
    imageURL?:string;
    communityImageURL?:string;
    createdAt:Timestamp;
}

interface PostState {
    selectedPost:Post | null;
    post: Post[];
    // postVotes
}

const defaultPostState: PostState = {
    selectedPost:null,
    post:[]
}

export const postState = atom<PostState>({
    key:"postDtate",
    default:defaultPostState
})