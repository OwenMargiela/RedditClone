import { firestore } from "@/firebase/clientApp";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { Community } from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";

type communityPageProps = {
  communityData: Community;
};

const CommunityPage: React.FC<communityPageProps> = ({ communityData }) => {
  return <div>Welcome TO {communityData.id}</div>;
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
        communityData: JSON.parse(
          safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
        ),
      },
    };
  } catch (error) {
    console.log("getSeverSideProps error", error);
  }
}
export default CommunityPage;
