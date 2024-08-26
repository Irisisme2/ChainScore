/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdTrendingUp,
  MdStar,
  MdGavel,
  MdAccountBalanceWallet,
  MdSecurity,
} from "react-icons/md";
import PerformanceAnalytics from "views/admin/default/components/PerformanceAnalytics";
import QuickActions from "views/admin/default/components/QuickActions";
import CreditScoreCard from "views/admin/default/components/CreditScoreCard";
import AssetAndLoanCard from "views/admin/default/components/AssetAndLoanCard";;

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
  columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
  gap="20px"
  mb="20px"
>
  {/* Credit Score */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Icon w="32px" h="32px" as={MdStar} color={brandColor} />
        }
      />
    }
    name="Credit Score"
    value="750" // Example credit score value
  />

  {/* Total Borrowed */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Icon w="32px" h="32px" as={MdTrendingUp} color={brandColor} />
        }
      />
    }
    name="Total Borrowed"
    value="$10,500" // Example total borrowed value
  />

  {/* Total Collateral */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={<Icon w="28px" h="28px" as={MdSecurity} color={brandColor}  />}
      />
    }
    name="Total Collateral"
    value="$15,000" // Example total collateral value
  />

  {/* Number of Loans */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Icon w="32px" h="32px" as={MdAccountBalanceWallet} color={brandColor} />
        }
      />
    }
    name="Number of Loans"
    value="3" // Example number of active loans
  />

  {/* Available Balance */}
  <MiniStatistics
    endContent={
      <Flex me="-16px" mt="10px">
        <FormLabel htmlFor="balance">
          <Avatar src={Usa} />
        </FormLabel>
        <Select
          id="balance"
          variant="mini"
          mt="5px"
          me="0px"
          defaultValue="usd"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="bnb">BNB</option>
        </Select>
      </Flex>
    }
    name="Available Balance"
    value="$5,000" // Example available balance
  />

  {/* Governance Proposals */}
  <MiniStatistics
    startContent={
      <IconBox
        w="56px"
        h="56px"
        bg={boxBg}
        icon={
          <Icon w="32px" h="32px" as={MdGavel} color={brandColor} />
        }
      />
    }
    name="Governance Proposals"
    value="5" // Example number of active governance proposals
  />
</SimpleGrid>


      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <CreditScoreCard />
        <AssetAndLoanCard />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <PerformanceAnalytics />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
          <QuickActions />
      </SimpleGrid>
    </Box>
  );
}
