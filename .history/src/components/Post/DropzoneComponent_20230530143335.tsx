import React, { useRef } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";

import { BsImage } from "react-icons/bs";

// type DropzoneProps = {

// };

const DropzoneComponent: React.FC = () => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Flex
        onClick={() => selectedFileRef.current?.click()}
        flexDirection={"column"}
        padding={"50px 0"}
        border={"2px dashed #718096"}
        gap={"10px"}
        align={"center"}
        justify={"center"}
        cursor={"pointer"}
        _hover={{ backgroundColor: "gray.50" }}
      >
        <Flex gap={"10px"} align={"center"} justify={"center"}>
          <Icon boxSize={9} color={"gray.500"} as={BsImage}></Icon>
          <Text color={"gray.500"} fontSize={"9pt"}>
            Upload your images here
          </Text>
        </Flex>
        <input ref={selectedFileRef} type="file" hidden />
      </Flex>
    </>
  );
};
export default DropzoneComponent;
