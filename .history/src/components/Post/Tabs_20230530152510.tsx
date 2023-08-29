import { Button, Flex, Icon, TabIndicator, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { BiLink } from "react-icons/bi";
import TextInputs from "./TextInputs";
import DropzoneComponent from "./DropzoneComponent";

type TabItemProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onchange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
  selectedFile?: string;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;

  setSelectedFile: (value: string) => void;
};

const TabItems: React.FC<TabItemProps> = ({
  textInputs,
  onchange,
  handleCreatePost,
  loading,
  selectedFile,
  setSelectedFile,

  onSelectImage,
}) => {
    const [tabIndex, setTabIndex] = useState<number>(0)
    const setTab = () =>{
        setTabIndex(1)
    }
    const handleTabsChange = (index:number) => {
        setTabIndex(index)
      }
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange} variant="enclosed-colored" width={"100%"} size="md">
      <TabList>
        <Tab
          _selected={{ color: "blue.500", backgroundColor: "gray.50" }}
          color={"gray.500"}
          backgroundColor={"whiteAlpha.500"}
          flexGrow={1}
        >
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"inherit"} as={FaRegNewspaper}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Post
            </Text>
          </Flex>
        </Tab>
        <Tab
          _selected={{ color: "blue.500", backgroundColor: "gray.50" }}
          color={"gray.500"}
          flexGrow={1}
          backgroundColor={"whiteAlpha.500"}
        >
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"inherit"} as={BsImage}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Images & Video
            </Text>
          </Flex>
        </Tab>
        <Tab
          backgroundColor={"whiteAlpha.500"}
          _selected={{ color: "blue.500", backgroundColor: "gray.50" }}
          color={"gray.500"}
          flexGrow={1}
        >
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"inherit"} as={BiLink}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Link
            </Text>
          </Flex>
        </Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" />
      <TabPanels>
        <TabPanel>
          <TextInputs
            textInputs={textInputs}
            handleCreatePost={handleCreatePost}
            onchange={onchange}
            loading={loading}
          ></TextInputs>
        </TabPanel>
        <TabPanel>
          <DropzoneComponent
            selectedFile={selectedFile}
            onSelectImage={onSelectImage}
            setSelectedFile={setSelectedFile}
          ></DropzoneComponent>
          <Button onClick={() => {setTab}} marginTop={"10px"} padding={"0 2.5em"} color={"blue.500"}>
            <Text color={"white"} fontSize={"9pt"}>
              Post
            </Text>
          </Button>
        </TabPanel>
        <TabPanel>
          <p>3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabItems;
