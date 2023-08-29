import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {  
};

const PageContent: React.FC<PageContentProps> = ({children}) => {
  return (
    <Flex>
      <Flex>
        <Flex></Flex>

        <Flex></Flex>
      </Flex>
    </Flex>
  );
};
export default PageContent;
