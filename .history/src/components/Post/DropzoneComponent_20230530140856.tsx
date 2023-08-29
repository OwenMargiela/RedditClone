import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { BsImage } from "react-icons/bs";

// type DropzoneProps = {

// };

const DropzoneComponent: React.FC = () => {
  return (
    <>
      <Dropzone
        onDrop={(files) => console.log("accepted files", files)}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
      >
        {/* <Dropzone.Accept>
       
        </Dropzone.Accept>
        <Dropzone.Reject>
         
        </Dropzone.Reject>
        <Dropzone.Idle>
         
        </Dropzone.Idle> */}
        <Flex gap={"10px"} align={"center"} justify={"center"}>
          <Icon h={8} color={"gray.500"} as={BsImage}></Icon>
          <Text color={"gray.500"} fontSize={"9pt"}>
            Drag images here or click to select files
            <br />
          Attach as many files as you like, each file should not exceed 5mb
          </Text>
        </Flex>
        

      </Dropzone>
    </>
  );
};
export default DropzoneComponent;
