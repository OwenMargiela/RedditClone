import { Timestamp } from 'firebase/firestore';
import React from 'react';

type CommentItemProps = {
    
};

export type Comment = {
    id: String;
    creatorId: string;
    creatorDisplayText: string;
    communityId: string;
    postId: string;
    postTitle: string;
    text: string;
    createdAt: Timestamp;
  };

const CommentItem:React.FC<CommentItemProps> = () => {
    
    return <div>Have a good coding</div>
}
export default CommentItem;