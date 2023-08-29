import React, { useRef } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";

import { BsImage } from "react-icons/bs";

type DropzoneProps = {
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setSelectedFile: (value: string) => void;
};

const DropzoneComponent: React.FC<DropzoneProps> = ({
  selectedFile,
  setSelectedFile,

  onSelectImage,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Flex
        flexDirection={"column"}
        padding={"50px 0"}
        border={"2px dashed #718096"}
        gap={"10px"}
        align={"center"}
        justify={"center"}
      >
        <Flex gap={"10px"} align={"center"} justify={"center"}>
          {!selectedFile && (
            <Flex padding={"10px"} gap={"10px"} align={"center"} justify={"center"}  _hover={{ backgroundColor: "gray.50" }}>
              <Icon boxSize={9} color={"gray.500"} as={BsImage}></Icon>
              <Text
                cursor={"pointer"}
                onClick={() => selectedFileRef.current?.click()}
                color={"gray.500"}
                fontSize={"9pt"}
                
              >
                Upload your images here
              </Text>
            </Flex>
          )}
          {selectedFile && (
            <>
              <Button variant={"outline"} border={"1px solid #718096"}>
                <Text
                  onClick={() => setSelectedFile("")}
                  color={"gray.500"}
                  fontSize={"9pt"}
                >
                  Deselect Image
                </Text>
              </Button>
            </>
          )}
        </Flex>
        <input
          ref={selectedFileRef}
          type="file"
          hidden
          onChange={onSelectImage}
        />
        <img src={selectedFile}></img>
      </Flex>
    </>
  );
};
export default DropzoneComponent;
