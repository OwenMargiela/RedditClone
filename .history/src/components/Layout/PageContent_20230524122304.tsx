import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ children }) => {
  console.log(children);

  return (
    <Flex justifyContent={"center"} p={"16px 8px"} border="1px solid red">
      <Flex
        width={"95%"}
        justify={"center"}
        maxWidth={"860px"}
        border={"1px solid green"}
      >
        <Flex
          direction="column"
          width={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
          border={"1px solid blue"}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>

        <Flex
          border={"1px solid orange"}
          display={{ base: "none", md: "flex" }}
          flexDirection={"column"}
          flexGrow={1}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
