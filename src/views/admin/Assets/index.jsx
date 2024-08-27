import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import MyAssets from "views/admin/Assets/components/MyAssets";
import PortfolioManagement from "views/admin/Assets/components/PortfolioManagement";
import React from "react";
import { ChakraProvider } from '@chakra-ui/react';

export default function Settings() {
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction={{ base: "column", md: "row" }} mb='20px' spacing={{ base: "20px", xl: "20px" }}>
        <Box flex="3" p={4}> {/* 75% of the width */}
            <MyAssets />
        </Box>
        <Box flex="1" p={4}> {/* 25% of the width */}
        <PortfolioManagement/>
        </Box>
      </Flex>
    </Box>
  );
}
