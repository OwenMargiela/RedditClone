import { Flex, Icon, TabIndicator, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { BiLink } from "react-icons/bi";

const TabItems: React.FC = () => {
  const [selected, setSelected] = useState(false);
  return (
    <Tabs variant="enclosed-colored" width={"100%"} size="md">
      <TabList>
        <Tab color={"gray.500"} width={"33%"}>
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"gray.500"} as={FaRegNewspaper}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Post
            </Text>
          </Flex>
        </Tab>
        <Tab width={"33%"}>
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"gray.500"} as={BsImage}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Images & Video
            </Text>
          </Flex>
        </Tab>
        <Tab width={"34%"}>
          <Flex gap={"4px"} align={"center"} justify={"center"}>
            <Icon color={"gray.500"} as={BiLink}></Icon>{" "}
            <Text fontSize={"9pt"} fontWeight={"bold"} color={"inherit"}>
              Link
            </Text>
          </Flex>
        </Tab>
      </TabList>
      <TabIndicator mt="-1.5px" height="2px" bg="blue.500" />
      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>3</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default TabItems;
