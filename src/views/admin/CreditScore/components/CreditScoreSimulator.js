import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  IconButton,
  useToast,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { FaInfoCircle, FaFileExport } from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip as ChartTooltip, Legend, PointElement } from 'chart.js';
import Card from 'components/card/Card';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, ChartTooltip, Legend, PointElement);

const CreditScoreSimulator = () => {
  const [collateral, setCollateral] = useState(0);
  const [repayment, setRepayment] = useState(0);
  const [newLoan, setNewLoan] = useState(0);
  const [defiAction, setDefiAction] = useState(0);
  const [creditScore, setCreditScore] = useState(750);
  const [showImpact, setShowImpact] = useState(false);
  const [history, setHistory] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [selectedAction, setSelectedAction] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const bgColor = useColorModeValue('white', 'gray.800');

  const chartData = {
    labels: history.map((_, index) => `Simulation ${index + 1}`),
    datasets: [
      {
        label: 'Credit Score',
        data: history.map(entry => entry.score),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const calculateScore = () => {
    let newScore = 750;

    // Simulate impact based on user actions
    newScore += (collateral * 0.1) - (repayment * 0.2) + (newLoan * 0.5) + (defiAction * 0.3);
    newScore = Math.max(0, Math.min(newScore, 850)); // Ensure score stays within 0-850

    setCreditScore(newScore);

    // Add to history
    setHistory([{ collateral, repayment, newLoan, defiAction, score: newScore }, ...history].slice(0, 5));
    toast({
      title: "Simulation Successful",
      description: `New credit score: ${Math.round(newScore)}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const exportData = () => {
    const csvData = [
      ['Collateral', 'Repayment', 'New Loan', 'DeFi Actions', 'Credit Score'],
      ...history.map(entry => [
        entry.collateral,
        entry.repayment,
        entry.newLoan,
        entry.defiAction,
        entry.score,
      ]),
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'credit_score_simulation.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card p={6} borderRadius="md" shadow="md" bg={bgColor}>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Credit Score Simulator
        </Text>
        <Flex direction="column" spacing={4}>
          {/* Adjust Collateral */}
          <Box mb={4}>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Adjust Collateral</Text>
              <Tooltip label="Increasing collateral improves your financial security and can positively impact your credit score.">
                <IconButton icon={<FaInfoCircle />} aria-label="Info about Adjust Collateral" variant="link" />
              </Tooltip>
            </Flex>
            <Slider
              aria-label="collateral-slider"
              defaultValue={0}
              min={0}
              max={10000}
              step={100}
              onChange={(val) => setCollateral(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              mt={2}
              value={collateral}
              onChange={(e) => setCollateral(Number(e.target.value))}
              type="number"
              placeholder="Enter collateral amount"
            />
          </Box>

          {/* Make a Repayment */}
          <Box mb={4}>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">Make a Repayment</Text>
              <Tooltip label="Making a repayment lowers your outstanding balance and can enhance your credit score." >
                <IconButton icon={<FaInfoCircle />} aria-label="Info about Make a Repayment" variant="link" />
              </Tooltip>
            </Flex>
            <Slider
              aria-label="repayment-slider"
              defaultValue={0}
              min={0}
              max={5000}
              step={50}
              onChange={(val) => setRepayment(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              mt={2}
              value={repayment}
              onChange={(e) => setRepayment(Number(e.target.value))}
              type="number"
              placeholder="Enter repayment amount"
            />
          </Box>

          {/* New Loan Request */}
          <Box mb={4}>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">New Loan Request</Text>
              <Tooltip label="Taking out a new loan increases your debt, which can affect your credit score based on repayment history." >
                <IconButton icon={<FaInfoCircle />} aria-label="Info about New Loan Request" variant="link" />
              </Tooltip>
            </Flex>
            <Slider
              aria-label="new-loan-slider"
              defaultValue={0}
              min={0}
              max={10000}
              step={100}
              onChange={(val) => setNewLoan(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              mt={2}
              value={newLoan}
              onChange={(e) => setNewLoan(Number(e.target.value))}
              type="number"
              placeholder="Enter loan amount"
            />
          </Box>

          {/* DeFi Actions */}
          <Box mb={4}>
            <Flex align="center" justify="space-between">
              <Text fontSize="lg" fontWeight="bold">DeFi Actions</Text>
              <Tooltip label="Participating in DeFi actions can diversify your financial profile and potentially boost your credit score." >
                <IconButton icon={<FaInfoCircle />} aria-label="Info about DeFi Actions" variant="link" />
              </Tooltip>
            </Flex>
            <Slider
              aria-label="defi-slider"
              defaultValue={0}
              min={0}
              max={5000}
              step={50}
              onChange={(val) => setDefiAction(val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Input
              mt={2}
              value={defiAction}
              onChange={(e) => setDefiAction(Number(e.target.value))}
              type="number"
              placeholder="Enter DeFi action amount"
            />
          </Box>

          {/* Simulate Button */}
          <Button
            colorScheme="blue"
            onClick={() => {
              calculateScore();
              setShowImpact(true);
            }}
          >
            Simulate Impact
          </Button>

          {/* Comparison Select */}
          <Box mt={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Compare Simulations</Text>
            <Select placeholder="Select a simulation to compare" onChange={(e) => setComparisonData(history[Number(e.target.value)])}>
              {history.map((entry, index) => (
                <option key={index} value={index}>{`Simulation ${index + 1}`}</option>
              ))}
            </Select>
          </Box>

          {/* Dynamic Output Display */}
          {showImpact && (
            <Box mt={6}>
              <Text fontSize="lg" fontWeight="bold" mb={2}>Simulated Credit Score</Text>
              <Flex align="center" justify="center" direction="column">
                <CircularProgress
                  value={(creditScore / 850) * 100}
                  size="120px"
                  thickness="8px"
                  color={creditScore > 750 ? 'green.400' : 'red.400'}
                  trackColor="gray.200"
                >
                  <CircularProgressLabel fontSize="2xl" fontWeight="bold">
                    {Math.round(creditScore)}
                  </CircularProgressLabel>
                </CircularProgress>
              </Flex>
              <Box mt={4}>
                <Text fontSize="md" fontWeight="bold" mb={2}>Explanation of Impact:</Text>
                <Text mb={2}>• Adjusting collateral may increase or decrease your score based on your risk profile.</Text>
                <Text mb={2}>• Making a repayment improves your score by demonstrating responsible debt management.</Text>
                <Text mb={2}>• Requesting a new loan can temporarily decrease your score due to increased debt obligations.</Text>
                <Text>• Participating in DeFi actions can positively impact your score by diversifying your financial activities.</Text>
              </Box>
            </Box>
          )}

          {/* Historical Data Table */}
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>Simulation History</Text>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Simulation</Th>
                    <Th>Collateral</Th>
                    <Th>Repayment</Th>
                    <Th>New Loan</Th>
                    <Th>DeFi Actions</Th>
                    <Th>Credit Score</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {history.map((entry, index) => (
                    <Tr key={index}>
                      <Td>{`Simulation ${index + 1}`}</Td>
                      <Td>${entry.collateral}</Td>
                      <Td>${entry.repayment}</Td>
                      <Td>${entry.newLoan}</Td>
                      <Td>${entry.defiAction}</Td>
                      <Td>{Math.round(entry.score)}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>

          {/* Line Chart */}
          {history.length > 0 && (
            <Box mt={6} borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
              <Text fontSize="lg" fontWeight="bold" mb={2}>Credit Score History</Text>
              <Line data={chartData} options={{
                plugins: {
                  legend: { display: true },
                  tooltip: { callbacks: { label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}` } },
                },
                scales: {
                  x: { title: { display: true, text: 'Simulation Number' } },
                  y: { title: { display: true, text: 'Credit Score' }, min: 0, max: 850 },
                },
              }} />
            </Box>
          )}

          {/* Export Button */}
          <Button
            mt={4}
            colorScheme="green"
            leftIcon={<FaFileExport />}
            onClick={exportData}
          >
            Export Data
          </Button>
        </Flex>
      </Card>

      {/* Help Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedAction} Explanation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAction === 'Adjust Collateral' && (
              <Text>Increasing collateral demonstrates financial security and can improve your credit score as it reduces the lender's risk.</Text>
            )}
            {selectedAction === 'Make a Repayment' && (
              <Text>Making a repayment lowers your debt balance, which can enhance your credit score by showing responsible debt management.</Text>
            )}
            {selectedAction === 'New Loan Request' && (
              <Text>Taking out a new loan can affect your score based on the amount and your total debt levels. Ensure timely repayments to mitigate negative impacts.</Text>
            )}
            {selectedAction === 'DeFi Actions' && (
              <Text>Engaging in DeFi activities like staking and liquidity provision can positively impact your credit score by demonstrating diversified financial behavior.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreditScoreSimulator;

