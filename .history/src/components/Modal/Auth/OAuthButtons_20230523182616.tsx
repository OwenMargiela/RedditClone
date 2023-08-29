import { auth, firestore } from "@/firebase/clientApp";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, userCred, loading, error] =
    useSignInWithGoogle(auth);
  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button
        isLoading={loading}
        onClick={() => signInWithGoogle()}
        mb={2}
        variant={"oauth"}
      >
        <Image src="/images/googlelogo.png" height="20px" mr={4} />
        Continue with Google
      </Button>
      <Text fontSize={"9pt"} color={"red.500"}>{error?.message}</Text>
    </Flex>
  );
};
export default OAuthButtons;
