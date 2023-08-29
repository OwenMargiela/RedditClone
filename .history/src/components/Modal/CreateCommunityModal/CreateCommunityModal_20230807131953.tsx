import { auth, firestore } from "@/firebase/clientApp";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [charsRemaining, setcharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setCommunityName(event.target.value);
    setcharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names should contain 3 - 12 characters and should only contain letters, numbers or underscores"
      );
      return;
    }
    setLoading(true);

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

    setLoading(false);
    router.push(`/r/${communityName}`);
    
  };

  return (
    <>
      <Modal size={"lg"} isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={"flex"}
            flexDirection={"column"}
            fontSize={15}
            padding={3}
          >
            Create a Community
          </ModalHeader>
          <Box paddingLeft={3} paddingRight={3}>
            <ModalBody
              display={"flex"}
              flexDirection={"column"}
              padding={"10px 8px"}
            >
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color={"gray.500"}>
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position={"relative"}
                top="28px"
                left="10px"
                width="20px"
                color={"gray.400"}
              >
                r/
              </Text>
              <Input
                position={"relative"}
                value={communityName}
                size={"sm"}
                pl="22px"
                onChange={handleChange}
              ></Input>
              <Text
                fontSize={"10pt"}
                color={charsRemaining === 0 ? "red.500" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Text fontSize={"9pt"} color={"red.600"} paddingTop={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}></Text>

                <Stack spacing={2}>
                  <Checkbox
                    isChecked={communityType === "public"}
                    name="public"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems={"center"} justifyContent={"center"}>
                      <Icon
                        mr={"5px"}
                        as={BsFillPersonFill}
                        color="gray.500"
                      ></Icon>
                      <Text fontSize={"10pt"} marginRight={1}>
                        Public
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} paddingTop={1}>
                        Anyone can view, post and comment to the community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    isChecked={communityType === "restricted"}
                    name="restricted"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems={"center"}>
                      <Icon
                        mr={"5px"}
                        as={BsFillEyeFill}
                        color="gray.500"
                      ></Icon>
                      <Text fontSize={"10pt"} marginRight={1}>
                        Resctricted
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} paddingTop={1}>
                        Anyone can view this comunity but only approved users
                        can post
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    isChecked={communityType === "private"}
                    name="private"
                    onChange={onCommunityTypeChange}
                  >
                    <Flex alignItems={"center"}>
                      <Icon
                        mr={"5px"}
                        as={HiLockClosed}
                        color={"gray.500"}
                      ></Icon>
                      <Text fontSize={"10pt"} marginRight={1}>
                        Private
                      </Text>
                      <Text fontSize={"8pt"} color={"gray.500"} paddingTop={1}>
                        Only approved users can view and submit to the community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>
          <ModalCloseButton />

          <ModalFooter bg="gray.100" borderRadius={"0px 0px 10px 10px"}>
            <Button
              variant={"outline"}
              mr={3}
              height={"30px"}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              height={"30px"}
              onClick={handleCreateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default CreateCommunityModal;
