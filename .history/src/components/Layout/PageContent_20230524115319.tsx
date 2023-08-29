import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = {  
    children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({children}) => {
    console.log(children)
    
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
