import React, { useRef } from "react";
import { Button, Flex, Icon, Text } from "@chakra-ui/react";

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
            <>
              <Icon boxSize={9} color={"gray.500"} as={BsImage}></Icon>
              <Button
                onClick={() => selectedFileRef.current?.click()}
                variant={"outline"}
              >
                <Text color={"gray.500"} fontSize={"9pt"}>
                  Upload your images here
                </Text>
              </Button>
            </>
          )}
          {selectedFile && (
            <>
              <Button variant={"outline"} border={"1px solid #718096 "}>
                <Text
                  onClick={() => setSelectedFile("")}
                  color={"gray.500"}
                  fontSize={"9pt"}
                >
                  Deselect Image
                </Text>
              </Button>
              <Button padding={"0 15px"}  color={"blue.500"} >
                <Text
                  
                  color={"white"}
                  fontSize={"9pt"}
                >
                  Post
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
