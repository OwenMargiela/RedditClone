import React, { useRef } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { BsImage } from "react-icons/bs";

// type DropzoneProps = {

// };

const DropzoneComponent: React.FC = () => {
    const selectedFileRef = useRef<HTMLInputElement>(null)
  return (
    <>
      {/* <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
      </Dropzone> */}

        <Flex border={"1px dashed gray"} gap={"10px"} align={"center"} justify={"center"}>
          <Icon boxSize={9} color={"gray.500"} as={BsImage}></Icon>
          <Text color={"gray.500"} fontSize={"9pt"}>
            Drag images here or click to select files
            <br />
            Attach as many files as you like, each file should not exceed 5mb
          </Text>
          <input ref={selectedFileRef} type="file" hidden  />
        </Flex>
    </>
  );
};
export default DropzoneComponent;
