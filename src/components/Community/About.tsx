import useSelectFile from "@/Hooks/useSelectFile";
import { Community, communityState } from "@/atoms/communitiesAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";

import React, { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdCake } from "react-icons/md";
import { useSetRecoilState } from "recoil";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const selectedFileRef = useRef<HTMLInputElement>(null);
  const { selectedFile, setSelectedFile, onSelectFile } = useSelectFile();
  const router = useRouter();
  const [uploadingImage, setUploaingImage] = useState(false);
  const setCommunityStateValue = useSetRecoilState(communityState);
  const onUpdateImage = async () => {
    if (!selectedFile) return;
    try {
      setUploaingImage(true);
      const imageRef = ref(storage, `communities/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      console.log("Download URL is", downloadURL);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });

      setCommunityStateValue((prev) => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }));
     
    } catch (error) {
      console.log("OnUpdateImage error", error);
    }
    setUploaingImage(false);
  };
  return (
    <>
      <Box position={"sticky"} top="14px">
        <Flex
          justify={"space-between"}
          align={"center"}
          bg={"blue.500"}
          color={"white"}
          p={3}
          borderRadius={"4px 4px 4px 4px"}
        >
          <Text fontSize={"10pt"} fontWeight={700}>
            About Community
          </Text>
          <Icon as={HiOutlineDotsHorizontal}></Icon>
        </Flex>
        <Flex
          direction={"column"}
          p={3}
          bg={"white"}
          borderRadius={"0px 0px 4px 4px"}
        >
          <Stack>
            <Flex width={"100%"} p={2} fontSize={"10pt"} fontWeight={700}>
              <Flex direction={"column"} flexGrow={1}>
                <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
                <Text>Memebers</Text>
              </Flex>
              <Flex direction={"column"} flexGrow={1}>
                <Text>1</Text>
                <Text>Online</Text>
              </Flex>
            </Flex>
            <Divider />
            <Flex
              color={"gray.500"}
              align={"center"}
              justifyContent={"center"}
              gap={"4px"}
              width={"100%"}
              p={1}
              fontWeight={500}
              fontSize={"10pt"}
            >
              <Icon as={MdCake}></Icon>
              {communityData.createdAt && (
                <Text>
                  Created{" "}
                  {moment(
                    new Date(communityData.createdAt?.seconds * 1000)
                  ).format("MMM DD, YYYY")}{" "}
                </Text>
              )}
            </Flex>
            <Link href={`/r/${communityData.id}/submit`}>
              <Button mt={3} height={"30px"}>
                Create Post
              </Button>
            </Link>
            {user?.uid === communityData.creatorId && (
              <>
                <Divider></Divider>
                <Stack spacing={1} fontSize={"10pt"}>
                  <Text fontWeight={600}>Admin</Text>
                  <Flex align={"center"} justify={"space-between"}>
                    <Text
                      color={"blue.500"}
                      cursor={"pointer"}
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => selectedFileRef.current?.click()}
                    >
                      Change Image
                    </Text>
                    {communityData.imageURL || selectedFile ? (
                      <>
                        <Image
                          src={selectedFile || communityData.imageURL}
                          alt="Community Page"
                          boxSize={"40px"}
                          borderRadius={"full"}
                        />
                      </>
                    ) : (
                      <>
                        <Icon
                          as={FaReddit}
                          fontSize={40}
                          color={"brand.100"}
                          mr={2}
                        ></Icon>
                      </>
                    )}
                  </Flex>
                  {selectedFile &&
                    (uploadingImage ? (
                      <Spinner></Spinner>
                    ) : (
                      <Text cursor={"pointer"} onClick={onUpdateImage}>
                        Save Changes
                      </Text>
                    ))}
                  <input
                    ref={selectedFileRef}
                    type="file"
                    hidden
                    accept="image/x-png,image/gif,image/jpeg"
                    onChange={onSelectFile}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </Flex>
      </Box>
    </>
  );
};
export default About;
