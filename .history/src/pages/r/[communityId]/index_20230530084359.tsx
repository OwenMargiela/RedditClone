import { firestore } from "@/firebase/clientApp";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { Community } from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import CommunityNotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";

type communityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound></CommunityNotFound>;
  }
  return (
    <>
      <Header communityData={communityData}></Header>
      <PageContent>
        <>
          <CreatePostLink></CreatePostLink>
        </>
        <>
          <div>Rhs</div>
          <div>Rhs</div>
          <div>Rhs</div>
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
