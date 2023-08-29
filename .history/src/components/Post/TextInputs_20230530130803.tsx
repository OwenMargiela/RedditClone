import React from "react";
import {
  Button,
  Flex,
  Input,
  Stack,
  Textarea,
  extendTheme,
} from "@chakra-ui/react";
type TextInputsProps = {};

const TextInputs: React.FC<TextInputsProps> = () => {
  return (
    <Stack spacing={3} width={"100%"}>
      <Input
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
      ></Input>
      <Textarea
        height={"100px"}
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
      <Flex>
        <Button
          height={"34px"}
          padding={"0px 30px"}
          disabled={false}
          onClick={() => {}}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
