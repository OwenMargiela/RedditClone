import React from "react";
import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  extendTheme,
} from "@chakra-ui/react";
type TextInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onchange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<TextInputsProps> = ({
  textInputs,
  onchange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width={"100%"}>
      <Input
        name="title"
        fontSize={"10pt"}
        value={textInputs.title}
        borderRadius={4}
        placeholder="Title"
        onChange={onchange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      ></Input>
      <Textarea
        height={"100px"}
        onChange={onchange}
        value={textInputs.body}
        name="title"
        fontSize={"10pt"}
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "black",
        }}
      ></Textarea>
      <Flex justifyContent={"flex-end"}>
        <Button
          height={"34px"}
          padding={"0px 30px"}
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
