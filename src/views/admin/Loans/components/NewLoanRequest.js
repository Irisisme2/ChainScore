import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  VStack,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Alert,
  AlertIcon,
  useColorModeValue,
  Card,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

// Helper function to calculate LTV ratio and interest rate estimate
const calculateLTV = (loanAmount, collateralValue) => {
  return (loanAmount / collateralValue) * 100;
};

const interestRateEstimate = (creditScore, collateralType) => {
  let baseRate = 5.0; // Base rate in percentage
  if (collateralType === 'NFTs') baseRate += 1.0;
  if (creditScore < 600) baseRate += 2.0;
  return baseRate;
};

const NewLoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralType, setCollateralType] = useState('BNB');
  const [creditScore, setCreditScore] = useState(700);
  const [loanTerm, setLoanTerm] = useState(1); // in months
  const [collateralValue, setCollateralValue] = useState(10000);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [requests, setRequests] = useState([]);

  // Function to handle loan request submission
  const handleSubmit = () => {
    if (!loanAmount || !collateralValue) {
      setError('Please fill in all fields.');
      return;
    }
    const ltvRatio = calculateLTV(loanAmount, collateralValue);
    if (ltvRatio > 80) {
      setError('LTV ratio is too high!');
      return;
    }

    // Simulate request submission
    const newRequest = {
      id: Date.now(), // Unique ID based on timestamp
      amount: loanAmount,
      collateralType,
      term: loanTerm,
      ltvRatio: ltvRatio.toFixed(2),
      status: 'Pending',
    };

    setRequests([...requests, newRequest]);
    setLoanAmount('');
    setCollateralValue('');
    setError('');
    setSubmitted(true);

    // Simulate a delay to update request status
    setTimeout(() => {
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === newRequest.id ? { ...req, status: 'Approved' } : req
        )
      );
    }, 3000); // Update status after 3 seconds
  };

  const ltvRatio = calculateLTV(loanAmount, collateralValue);
  const estimatedInterestRate = interestRateEstimate(creditScore, collateralType);

  return (
    <Card p={4} borderRadius="md" shadow="md" bg={useColorModeValue('white', 'gray.800')} width="500px">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        New Loan Request
      </Text>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {submitted && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          Your loan request has been submitted successfully!
        </Alert>
      )}

      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Loan Amount</FormLabel>
          <Input
            type="number"
            placeholder="Enter loan amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Collateral Type</FormLabel>
          <Select
            value={collateralType}
            onChange={(e) => setCollateralType(e.target.value)}
            size="sm"
          >
            <option value="BNB">BNB</option>
            <option value="Stablecoins">Stablecoins</option>
            <option value="NFTs">NFTs</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Estimated Interest Rate</FormLabel>
          <Text fontSize="lg">{estimatedInterestRate}%</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Loan Term</FormLabel>
          <Slider
            min={1}
            max={12}
            step={1}
            value={loanTerm}
            onChange={(value) => setLoanTerm(value)}
            size="sm"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text mt={2} fontSize="sm">{loanTerm} month(s)</Text>
        </FormControl>

        <FormControl>
          <FormLabel>Collateral Value</FormLabel>
          <Input
            type="number"
            placeholder="Enter collateral value"
            value={collateralValue}
            onChange={(e) => setCollateralValue(e.target.value)}
            size="sm"
          />
        </FormControl>

        <FormControl>
          <FormLabel>LTV Ratio</FormLabel>
          <Text fontSize="lg" color={ltvRatio > 80 ? 'red.500' : 'black'}>
            {ltvRatio.toFixed(2)}%
          </Text>
          {ltvRatio > 80 && (
            <Text fontSize="sm" color="red.500">
              Warning: The LTV ratio is too high.
            </Text>
          )}
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit} size="sm">
          Submit Loan Request
        </Button>
      </VStack>

      <Box mt={6}>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Loan Requests
        </Text>

        <Box overflowX="auto">
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th fontSize="sm">ID</Th>
                <Th fontSize="sm">Amount</Th>
                <Th fontSize="sm">Collateral</Th>
                <Th fontSize="sm">Term</Th>
                <Th fontSize="sm">LTV Ratio</Th>
                <Th fontSize="sm">Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requests.map((req) => (
                <Tr key={req.id}>
                  <Td fontSize="sm">{req.id}</Td>
                  <Td fontSize="sm">${req.amount}</Td>
                  <Td fontSize="sm">{req.collateralType}</Td>
                  <Td fontSize="sm">{req.term}</Td>
                  <Td fontSize="sm">{req.ltvRatio}%</Td>
                  <Td fontSize="sm">
                    <Text color={req.status === 'Approved' ? 'green.500' : 'orange.500'}>
                      {req.status}
                    </Text>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Card>
  );
};

export default NewLoanRequest;


