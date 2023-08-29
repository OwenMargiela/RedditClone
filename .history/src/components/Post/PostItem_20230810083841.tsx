import { Post } from "@/atoms/postsAtom";
import {
  Flex,
  Icon,
  Stack,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { error } from "console";
import moment from "moment";
import Error from "next/error";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

type PostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onvote: (post: Post, vote: number, communityId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
  onSelectPost?: (post: Post) => void;
  homePage?: boolean
};

const PostItem: React.FC<PostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onvote,
  onDeletePost,
  onSelectPost,
  homePage
}) => {
  const [deleteError, setDeleteError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const singlePostPage = !onSelectPost;
  const router = useRouter();
  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);

      if (!success) {
        throw new TypeError("Failed to delete Post");
      }
      console.log("Post was successfully deleted");
      if (singlePostPage) {
        router.push(`/r/${post.communityId}`);
      }
    } catch (error: any) {
      console.log("handleDelete error,", error.message);
      setDeleteError(error.message);
    }
    setLoadingDelete(false);
  };
  return (
    <Flex
      border={"1px solid white"}
      bg={"white"}
      borderColor={singlePostPage ? "white" : "gray.500"}
      borderRadius={singlePostPage ? "4px 4px 0px 0px" : "4px"}
      _hover={{ borderColor: singlePostPage ? "none" : "gray.500" }}
      cursor={singlePostPage ? "unset" : "pointer"}
    >
      <Flex
        direction={"column"}
        align={"center"}
        bg={singlePostPage ? "none" : "gray.100"}
        p={2}
        width={"40px"}
        borderRadius={singlePostPage ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          onClick={() => onvote(post, 1, post.communityId)}
          cursor={"pointer"}
        ></Icon>
        <Text fontSize={"9pt"}>{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          fontSize={22}
          onClick={() => onvote(post, -1, post.communityId)}
          cursor={"pointer"}
        ></Icon>
      </Flex>
      <Flex direction={"column"} width={"100%"}>
        {deleteError && (
          <Alert status="error">
            <AlertIcon></AlertIcon>
            <Text fontSize={"9pt"} mr={2}>
              {deleteError}
            </Text>
          </Alert>
        )}
        <Stack
          spacing={1}
          padding={"10px"}
          onClick={() => onSelectPost && onSelectPost(post)}
        >
          <Stack
            direction={"row"}
            spacing={0.6}
            align={"center"}
            fontSize={"9pt"}
          >
            <Text>
              Posted by u/{post.creatorDisplayName}{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Stack>
          <Text fontSize={"12pt"} fontWeight={600}>
            {post.title}
          </Text>
          <Text fontSize={"10pt"}>{post.body}</Text>
          {post.imageURL && (
            <Flex justify={"center"} align={"center"} padding={2}>
              <Image maxHeight={"460px"} src={post.imageURL} alt="Post Image" />
            </Flex>
          )}
        </Stack>
        <Flex mb={4}>
          <Flex ml={1} mb={0.5} color={"gray.500"}>
            <Flex
              align={"center"}
              p={"8px 10px"}
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
            >
              <Icon as={BsChat} mr={2}></Icon>
              <Text fontSize={"9pt"}>{post.numberOfComments}</Text>
            </Flex>
          </Flex>
          <Flex ml={1} mb={0.5} color={"gray.500"}>
            <Flex
              align={"center"}
              p={"8px 10px"}
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
            >
              <Icon as={IoArrowRedoOutline} mr={2}></Icon>
              <Text fontSize={"9pt"}>share</Text>
            </Flex>
          </Flex>
          <Flex ml={1} mb={0.5} color={"gray.500"}>
            <Flex
              align={"center"}
              p={"8px 10px"}
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor={"pointer"}
            >
              <Icon as={IoBookmarkOutline} mr={2}></Icon>
              <Text fontSize={"9pt"}>Save</Text>
            </Flex>
          </Flex>
          {userIsCreator && (
            <Flex ml={1} mb={0.5} color={"gray.500"}>
              <Flex
                align={"center"}
                p={"8px 10px"}
                borderRadius={4}
                _hover={{ bg: "gray.200" }}
                cursor={"pointer"}
                onClick={handleDelete}
              >
                {loadingDelete ? (
                  <Spinner size={"sm"}></Spinner>
                ) : (
                  <>
                    <Icon as={AiOutlineDelete} mr={2}></Icon>
                    <Text fontSize={"9pt"}>Delete</Text>
                  </>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PostItem;
