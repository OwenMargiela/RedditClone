import { Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import TabItems from "./Tabs";
import { Post } from "@/atoms/postsAtom";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  Timestamp,
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "@/firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useSelectFile from "@/Hooks/useSelectFile";
type NewPostFormProps = {
  user: User;
  communityImageURL?: string 
};

const NewPostForm: React.FC<NewPostFormProps> = ({ user, communityImageURL }) => {
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {selectedFile,setSelectedFile,onSelectFile} = useSelectFile()
  const [error, setError] = useState("");
  
  const handleCreatePost = async () => {
    const { communityId } = router.query;
    const newPost: Post = {
      communityId: communityId as string,
      communityImageURL: communityImageURL || '',
      creatorId: user.uid,
      creatorDisplayName: user.email!.split("@")[0],
      title: textInputs.title,
      body: textInputs.body,
      numberOfComments: 0,
      voteStatus: 0,
      createdAt: serverTimestamp() as Timestamp,
    };
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "post"), newPost);
      if (selectedFile) {
        const imageRef = ref(storage, `post/${postDocRef.id}/image`);
        console.log("new post is ",newPost)
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back()
    } catch (error: any) {
      console.log("handleCreatePostError", error.message);
      setError(error);
    }
    setLoading(false);

  };

 

  const onTextChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // console.log(user.uid)

  return (
    <Flex direction={"column"} bg={"white"} borderRadius={4} mt={2}>
      <TabItems
        selectedFile={selectedFile}
        onSelectImage={onSelectFile}
        setSelectedFile={setSelectedFile}
        textInputs={textInputs}
        handleCreatePost={handleCreatePost}
        onchange={onTextChange}
        loading={loading}
      ></TabItems>
      {error && (
        <Alert>
          <AlertIcon></AlertIcon>
          <Text>Error creating Post</Text>
        </Alert>
      )}
    </Flex>
  );
};
export default NewPostForm;
