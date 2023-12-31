# Reddit Clone App

This project is a Reddit clone web application created with Next.js and deployed on Vercel. The app allows users to create an account, create communities, join existing communities, comment on posts, upvote/downvote, create posts, delete communities, and more. It leverages Firebase for authentication and database functionality, TypeScript for static typing, Chakra UI for styling, Recoil for state management, and Next.js for server-side rendering.

DEPLOYED VERCEL APP : https://reddit-clone-mu-amber.vercel.app/

## Features

- **User Authentication:** Create an account with Firebase authentication.
- **Community Management:** Create and join communities.
- **Post Interaction:** Create posts, comment on posts, and upvote/downvote.
- **Community Deletion:** Delete communities if you're the creator.
- **TypeScript:** Leveraging TypeScript for static typing.
- **Chakra UI:** Utilizing Chakra UI for a responsive and visually pleasing UI.
- **Recoil:** Managing app-wide state with Recoil.
- **Next.js:** Using Next.js for server-side rendering and efficient routing.
- **Firebase:** Backend functionality powered by Firebase.

## Snippets

Using Recoil to create app-wide state with custom types
CODE SNIPPET:
export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}


export interface CommunitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface CommunityState {
  mySnippets: CommunitySnippet[];
  currentCommunity?:Community
  snippetFetched: boolean
}

const deFaultCommunityState: CommunityState = {
  mySnippets: [],
  snippetFetched:false
};

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: deFaultCommunityState,
});
```

The following Firebase transaction is implemented to ensure coherent writing of data to multiple parts of a database. It ensures data written is in its most up-to-date version.
CODE SNIPPET:
try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        const communityDoc = await transaction.get(communityDocRef);

        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken, try another`);
        }

        transaction.set(communityDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        transaction.set(doc(firestore,`users/${user?.uid}/communitySnippet`, communityName),{
         communityId:communityName,
         isModerator:true
        })
      });

    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    }


In the following case, they are multiple database operations writing to multiple parts of the database. If any of these operations fail,
it may cause confusion as the operations all relate to the same process, so data must stay consistent. Hence batch operations are used to ensure that either all operations are successful or none of them are.

CODE SNIPPET:
   const onCreateComment = async () => {
    setCreateLoading(true);

    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: selectedPost?.id!,
        postTitle: selectedPost?.title!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      const postDocRef = doc(firestore, "post", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();

      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostStateValue((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("onCreateComment error", error);
    }
    setCreateLoading(false);
  };

Another example is seen in useCommunityData.tsx


CODE SNIPPET:
  const joinCommunity = async (communityData: Community) => {
    try {
      const batch = writeBatch(firestore);
      const newSinnpet: CommunitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
        isModerator: user?.uid === communityData.creatorId
      };

      batch.set(
        doc(firestore, `users/${user?.uid}/communitySnippet`, communityData.id),
        newSinnpet
      );

      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
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


 
 
