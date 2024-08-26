import React from 'react';
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue,
  Stack,
  Tooltip,
  Badge,
  VStack,
  HStack,
  Progress,
  Icon,
  Center,
  Grid,
  GridItem,
  SimpleGrid,
  Button,
  Divider,
} from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import Card from 'components/card/Card';
import { FaCoins, FaHandshake, FaPiggyBank, FaChartLine } from 'react-icons/fa'; // Sample icons for illustration

// Sample historical data for line chart
const historicalData = [
  { name: 'Jan', score: 720 },
  { name: 'Feb', score: 730 },
  { name: 'Mar', score: 745 },
  { name: 'Apr', score: 740 },
  { name: 'May', score: 750 },
  { name: 'Jun', score: 760 },
  { name: 'Jul', score: 770 },
  { name: 'Aug', score: 780 },
];

const CreditScoreOverview = ({ score = 750, maxScore = 850, composition = {}, averageScore = 700 }) => {
  // Define color schemes
  const progressColor = useColorModeValue('blue.400', 'blue.600');
  const bgColor = useColorModeValue('gray.50', 'gray.800');

  // Example composition data
  const scoreComposition = {
    transactionHistory: 25,
    loanRepaymentHistory: 30,
    assetHoldings: 20,
    defiParticipation: 25,
    ...composition,
  };

  // Calculate the score percentage
  const scorePercentage = (score / maxScore) * 100;

  return (
    <Card p={6} borderRadius="md" shadow="md" bg="white">
      <Flex direction="column" align="center" justify="center" mb={6}>
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Credit Score Overview
        </Text>
        <Box position="relative" display="inline-flex">
          <CircularProgress
            value={scorePercentage}
            size="150px"
            thickness="10px"
            color={progressColor}
            trackColor="gray.200"
            capIsRound
          >
            <CircularProgressLabel fontSize="lg" fontWeight="bold" color={progressColor}>
              {score}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
        <Text fontSize="md" mt={2} color={progressColor}>
          Your Credit Score: {score} / {maxScore}
        </Text>
        <Badge mt={2} colorScheme={score >= averageScore ? 'green' : 'red'}>
          {score >= averageScore ? 'Above Average' : 'Below Average'}
        </Badge>
      </Flex>

      {/* Score Composition Breakdown */}
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Score Composition Breakdown
        </Text>
        <VStack spacing={4} align="stretch">
          {/* Transaction History */}
          <HStack spacing={4}>
            <Icon as={FaCoins} w={6} h={6} color="teal.500" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="bold">
                Transaction History
                <Tooltip label="Points based on the frequency and volume of transactions." aria-label="Transaction History Info">
                  <InfoIcon ml={2} />
                </Tooltip>
              </Text>
              <Progress colorScheme="teal" value={scoreComposition.transactionHistory} size="lg" borderRadius="md" />
            </Box>
            <Badge colorScheme="teal" fontSize="0.8em" p={2}>
              {scoreComposition.transactionHistory} Points
            </Badge>
          </HStack>

          {/* Loan Repayment History */}
          <HStack spacing={4}>
            <Icon as={FaHandshake} w={6} h={6} color="green.500" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="bold">
                Loan Repayment History
                <Tooltip label="Points based on timely repayments or defaults." aria-label="Loan Repayment History Info">
                  <InfoIcon ml={2} />
                </Tooltip>
              </Text>
              <Progress colorScheme="green" value={scoreComposition.loanRepaymentHistory} size="lg" borderRadius="md" />
            </Box>
            <Badge colorScheme="green" fontSize="0.8em" p={2}>
              {scoreComposition.loanRepaymentHistory} Points
            </Badge>
          </HStack>

          {/* Asset Holdings */}
          <HStack spacing={4}>
            <Icon as={FaPiggyBank} w={6} h={6} color="purple.500" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="bold">
                Asset Holdings
                <Tooltip label="Points reflecting the diversity and stability of the user's portfolio." aria-label="Asset Holdings Info">
                  <InfoIcon ml={2} />
                </Tooltip>
              </Text>
              <Progress colorScheme="purple" value={scoreComposition.assetHoldings} size="lg" borderRadius="md" />
            </Box>
            <Badge colorScheme="purple" fontSize="0.8em" p={2}>
              {scoreComposition.assetHoldings} Points
            </Badge>
          </HStack>

          {/* DeFi Participation */}
          <HStack spacing={4}>
            <Icon as={FaChartLine} w={6} h={6} color="orange.500" />
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="bold">
                DeFi Participation
                <Tooltip label="Points for participating in DeFi protocols (e.g., staking, liquidity provision)." aria-label="DeFi Participation Info">
                  <InfoIcon ml={2} />
                </Tooltip>
              </Text>
              <Progress colorScheme="orange" value={scoreComposition.defiParticipation} size="lg" borderRadius="md" />
            </Box>
            <Badge colorScheme="orange" fontSize="0.8em" p={2}>
              {scoreComposition.defiParticipation} Points
            </Badge>
          </HStack>
        </VStack>
      </Box>

      {/* Historical Credit Score Trend */}
      <Box mt={6}>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Historical Credit Score Trend
        </Text>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <ChartTooltip />
            <Line type="monotone" dataKey="score" stroke={progressColor} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Tips and Suggestions */}
      <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Tips for Improving Your Score
        </Text>
        <Text fontSize="sm">1. Maintain a low credit utilization ratio by keeping your balances low.</Text>
        <Text fontSize="sm">2. Pay your loans on time to avoid penalties and improve your repayment history.</Text>
        <Text fontSize="sm">3. Diversify your asset holdings to increase the stability of your portfolio.</Text>
        <Text fontSize="sm">4. Engage more with DeFi protocols to potentially boost your score through increased participation.</Text>
      </Box>

      {/* Action Buttons */}
      <Box mt={6}>
        <Divider mb={4} />
        <SimpleGrid columns={2} spacing={4}>
          <Button colorScheme="blue" size="md" onClick={() => alert('Requesting more info...')}>
            Request More Info
          </Button>
          <Button colorScheme="green" size="md" onClick={() => alert('Taking action to improve score...')}>
            Improve My Score
          </Button>
        </SimpleGrid>
      </Box>
    </Card>
  );
};

export default CreditScoreOverview;
