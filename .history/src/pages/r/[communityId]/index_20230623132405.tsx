import { firestore } from "@/firebase/clientApp";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { Community, communityState } from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Post from "@/components/Post/Post";
import { useSetRecoilState } from "recoil";
import About from "@/components/Community/About";

type communityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {
  const setCommunityStateValue = useSetRecoilState(communityState)
  if (!communityData) {
    return <CommunityNotFound></CommunityNotFound>;
  }
  useEffect(() =>{
    setCommunityStateValue(prev =>({
      ...prev,
      currentCommunity: communityData
    }))
    
  },[])
  return (
    <>
      <Header communityData={communityData}></Header>
      <PageContent>
        <>
          <CreatePostLink></CreatePostLink>
         <Post communityData={communityData}></Post>
        </>
        <>
        <About communityData={communityData} ></About>
        </>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getSeverSideProps error", error);
  }
}
export default CommunityPage;
