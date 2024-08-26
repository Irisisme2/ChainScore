import React from 'react';
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
  useColorModeValue,
  Stack,
  Badge,
  Tooltip,
  Icon,
  Button,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { MdArrowUpward, MdArrowDownward, MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import Card from 'components/card/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Jan', score: 720 },
  { name: 'Feb', score: 730 },
  { name: 'Mar', score: 740 },
  { name: 'Apr', score: 750 },
  { name: 'May', score: 740 },
  { name: 'Jun', score: 750 },
  { name: 'Jul', score: 760 },
  { name: 'Aug', score: 755 },
];

const factorData = [
  { name: 'Payment History', value: 30 },
  { name: 'Credit Utilization', value: 25 },
  { name: 'Credit History Length', value: 20 },
  { name: 'New Credit', value: 15 },
  { name: 'Credit Mix', value: 10 },
];

const CreditScoreCard = ({ score = 750, maxScore = 850, historicalTrend = 'up', averageScore = 700 }) => {
  // Define colors based on score
  const progressColor = useColorModeValue('blue.400', 'blue.600');
  const trendColor = historicalTrend === 'up' ? 'green.400' : 'red.400';

  return (
    <Card p={6} borderRadius="md" shadow="md" bg="white">
      <Flex direction="column" align="center" justify="center">
        {/* Display Credit Score */}
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Current Credit Score
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color={progressColor} mb={4}>
          {score}
        </Text>

        {/* Circular Progress Bar */}
        <Box position="relative" display="inline-flex" alignItems="center">
          <CircularProgress
            value={(score / maxScore) * 100}
            size="120px"
            thickness="8px"
            color={progressColor}
            trackColor="gray.200"
          >
            <CircularProgressLabel fontSize="md" color={progressColor}>
              {Math.round((score / maxScore) * 100)}%
            </CircularProgressLabel>
          </CircularProgress>
        </Box>

        {/* Historical Trend and Comparison */}
        <Stack spacing={3} mt={6} align="center">
          <Flex align="center">
            <Text fontSize="sm" mr={2}>Historical Trend:</Text>
            <Badge colorScheme={historicalTrend === 'up' ? 'green' : 'red'}>
              <Icon as={historicalTrend === 'up' ? MdArrowUpward : MdArrowDownward} />
              {historicalTrend === 'up' ? 'Improving' : 'Declining'}
            </Badge>
          </Flex>

          <Flex align="center">
            <Text fontSize="sm" mr={2}>Average Score:</Text>
            <Text fontSize="lg" fontWeight="bold" color={progressColor}>
              {averageScore}
            </Text>
          </Flex>
        </Stack>

        {/* Historical Score Chart */}
        <Box mt={6} w="full" h="200px">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Score Trend Over Time</Text>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip />
              <Line type="monotone" dataKey="score" stroke={progressColor} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Score Factors Breakdown */}
        <Box mt={26} p={4}  w="full">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Score Breakdown</Text>
          <ResponsiveContainer height={200}>
            <PieChart>
              <Pie data={factorData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" fill={progressColor} label>
                {factorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Actionable Insights */}
        <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50" w="full">
          <Text fontSize="lg" fontWeight="bold" mb={2}>Actionable Insights</Text>
          <Stack spacing={2}>
            <Text fontSize="sm">1. Reduce your credit card balances to improve your credit utilization.</Text>
            <Text fontSize="sm">2. Avoid opening new credit accounts frequently to maintain a healthy credit history.</Text>
            <Text fontSize="sm">3. Ensure timely payments on all credit accounts to keep your payment history positive.</Text>
          </Stack>
        </Box>

        {/* Alerts and Notifications */}
        <Box mt={6} w="full">
          <Alert status="info" variant="left-accent">
            <AlertIcon />
            Your credit score has recently improved! Keep up the good work to secure better lending terms.
          </Alert>
        </Box>

        {/* Score Improvement Simulator */}
        <Box mt={6} w="full">
          <Button colorScheme="blue" size="lg" w="full" onClick={() => alert('Score Improvement Simulator Coming Soon')}>
            Simulate Score Improvement
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

export default CreditScoreCard;
