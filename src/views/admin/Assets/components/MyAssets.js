import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  IconButton,
  Tooltip,
  Collapse,
  SimpleGrid,
  Divider,
  Badge,
  Stack,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Progress,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { FaChartLine, FaSearch, FaChevronDown, FaChevronUp, FaPlus, FaMinus } from 'react-icons/fa';
import { Line, Pie as ChartPie } from 'react-chartjs-2';
import 'chart.js/auto';

import BTCIcon from 'assets/img/icons/BTC.png';
import USDTIcon from 'assets/img/icons/USDT.png';
import DAIIcon from 'assets/img/icons/DAI.png';
import ETHIcon from 'assets/img/icons/ETH.png';
import BNBIcon from 'assets/img/icons/BNB.png';
import ADAIcon from 'assets/img/icons/ADA.png';
import DOTIcon from 'assets/img/icons/DOT.png';
import LINKIcon from 'assets/img/icons/LINK.png';
import AAVEIcon from 'assets/img/icons/AAVE.jpg';
import UNIIcon from 'assets/img/icons/UNI.png';
import Card from 'components/card/Card';

// Przykładowe dane aktywów
const initialAssets = [
  { id: '1', name: 'Bitcoin', icon: BTCIcon, currentValue: 26000, depositedAmount: 0.5, apr: 5.0, dailyYield: 3.5, marketTrend: 'Up', volatility: 'High', historicalData: [26000, 26500, 27000, 25500, 26000], recentNews: 'Bullish trend continues', roi: 0.2 },
  { id: '2', name: 'Ethereum', icon: ETHIcon, currentValue: 1700, depositedAmount: 2.0, apr: 4.0, dailyYield: 2.0, marketTrend: 'Up', volatility: 'Medium', historicalData: [1700, 1750, 1600, 1650, 1700], recentNews: 'Upgraded to Ethereum 2.0', roi: 0.15 },
  { id: '3', name: 'Tether', icon: USDTIcon, currentValue: 1.00, depositedAmount: 5000, apr: 1.5, dailyYield: 7.5, marketTrend: 'Stable', volatility: 'Low', historicalData: [1.00, 1.01, 0.99, 1.00, 1.00], recentNews: 'Tether maintains stability', roi: 0.01 },
  { id: '4', name: 'DAI', icon: DAIIcon, currentValue: 1.00, depositedAmount: 3000, apr: 2.0, dailyYield: 8.0, marketTrend: 'Stable', volatility: 'Low', historicalData: [1.00, 1.00, 1.00, 1.00, 1.00], recentNews: 'DAI continues to be a popular stablecoin', roi: 0.02 },
  { id: '5', name: 'Binance Coin', icon: BNBIcon, currentValue: 300, depositedAmount: 10, apr: 6.0, dailyYield: 1.8, marketTrend: 'Up', volatility: 'Medium', historicalData: [300, 310, 320, 290, 300], recentNews: 'Binance Coin hits new highs', roi: 0.25 },
  { id: '6', name: 'Cardano', icon: ADAIcon, currentValue: 0.40, depositedAmount: 1500, apr: 3.5, dailyYield: 6.0, marketTrend: 'Up', volatility: 'High', historicalData: [0.40, 0.42, 0.38, 0.39, 0.40], recentNews: 'Cardano announces new updates', roi: 0.1 },
  { id: '7', name: 'Polkadot', icon: DOTIcon, currentValue: 8.50, depositedAmount: 100, apr: 5.5, dailyYield: 4.5, marketTrend: 'Stable', volatility: 'Medium', historicalData: [8.50, 8.60, 8.40, 8.55, 8.50], recentNews: 'Polkadot expands its ecosystem', roi: 0.18 },
  { id: '8', name: 'Chainlink', icon: LINKIcon, currentValue: 10.00, depositedAmount: 75, apr: 4.5, dailyYield: 3.0, marketTrend: 'Up', volatility: 'Medium', historicalData: [10.00, 10.20, 9.80, 10.10, 10.00], recentNews: 'Chainlink partners with new projects', roi: 0.12 },
  { id: '9', name: 'AAVE', icon: AAVEIcon, currentValue: 95.00, depositedAmount: 50, apr: 5.0, dailyYield: 4.0, marketTrend: 'Up', volatility: 'High', historicalData: [95.00, 96.00, 94.00, 95.50, 95.00], recentNews: 'AAVE continues to gain traction', roi: 0.22 },
  { id: '10', name: 'Uniswap', icon: UNIIcon, currentValue: 22.00, depositedAmount: 200, apr: 7.0, dailyYield: 3.5, marketTrend: 'Up', volatility: 'High', historicalData: [22.00, 22.50, 21.50, 22.10, 22.00], recentNews: 'Uniswap introduces new features', roi: 0.3 },
];

const MyAssets = () => {
  const [assets, setAssets] = useState(initialAssets);
  const [expandedAssetId, setExpandedAssetId] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('value');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVolatility, setFilterVolatility] = useState('');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');

  useEffect(() => {
    fetchAssetData();
  }, []);

  const fetchAssetData = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const updatedAssets = assets.map((asset) => ({
          ...asset,
          currentValue: asset.currentValue * (1 + Math.random() * 0.02 - 0.01),
        }));
        setAssets(updatedAssets);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      }
    }, 2000);
  };

  const totalPortfolioValue = assets.reduce(
    (acc, asset) => acc + asset.currentValue * asset.depositedAmount,
    0
  );

  const sortedAssets = [...assets].sort((a, b) => {
    if (sortCriteria === 'value') return b.currentValue - a.currentValue;
    if (sortCriteria === 'apr') return b.apr - a.apr;
    if (sortCriteria === 'amount') return b.depositedAmount - a.depositedAmount;
    return 0;
  });

  const filteredAssets = sortedAssets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterVolatility ? asset.volatility === filterVolatility : true)
  );

  const toggleAssetDetails = (id) => {
    setExpandedAssetId(expandedAssetId === id ? null : id);
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    onOpen();
  };

  const handleDeposit = () => {
    setAssets(assets.map((asset) =>
      asset.id === selectedAsset.id
        ? { ...asset, depositedAmount: asset.depositedAmount + depositAmount }
        : asset
    ));
    setDepositAmount(0);
    setWithdrawAmount(0);
    onClose();
  };

  const handleWithdraw = () => {
    setAssets(assets.map((asset) =>
      asset.id === selectedAsset.id
        ? { ...asset, depositedAmount: asset.depositedAmount - withdrawAmount }
        : asset
    ));
    setDepositAmount(0);
    setWithdrawAmount(0);
    onClose();
  };

  const renderChart = (historicalData) => {
    const data = {
      labels: historicalData.map((_, index) => `Day ${index + 1}`),
      datasets: [
        {
          label: 'Value Over Time',
          data: historicalData,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          fill: true,
        },
      ],
    };
    return <Line data={data} />;
  };

  const renderPieChart = () => {
    const data = {
      labels: assets.map((asset) => asset.name),
      datasets: [
        {
          data: assets.map((asset) => asset.depositedAmount * asset.currentValue),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#F7464A',
            '#46BFBD',
            '#FDB45C',
            '#949FB1',
            '#4D5360',
            '#9B59B6',
          ],
        },
      ],
    };
    return <ChartPie data={data} />;
  };

  return (
    <Card>
      <VStack spacing={4} align="stretch" bg={bgColor} p={4} borderRadius="md">
        {/* Search and Filter Section */}
        <HStack spacing={4} mb={4} justify="space-between">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="sm"
            width="auto"
          />
          <Select
            placeholder="Sort by"
            size="sm"
            onChange={(e) => setSortCriteria(e.target.value)}
          >
            <option value="value">Current Value</option>
            <option value="apr">APR</option>
            <option value="amount">Deposited Amount</option>
          </Select>
          <Select
            placeholder="Filter by Volatility"
            size="sm"
            onChange={(e) => setFilterVolatility(e.target.value)}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
          <Button
            leftIcon={<FaSearch />}
            colorScheme="teal"
            onClick={fetchAssetData}
          >
            Refresh Data
          </Button>
        </HStack>

        {/* Error Handling */}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle>Data Fetch Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box textAlign="center" py={4}>
            <Spinner size="xl" />
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {filteredAssets.map((asset) => (
              <Box
                key={asset.id}
                p={4}
                bg={cardBgColor}
                borderRadius="md"
                shadow="md"
                width="100%"
                cursor="pointer"
                onClick={() => toggleAssetDetails(asset.id)}
              >
                <HStack spacing={4}>
                  <Image src={asset.icon} alt={asset.name} boxSize="60px" />
                  <Box flex="1">
                    <Text fontWeight="bold" fontSize="lg">{asset.name}</Text>
                    <Text color="gray.500">Current Value: ${asset.currentValue.toLocaleString()}</Text>
                    <Text color="gray.500">APR: {asset.apr}%</Text>
                    <Text color="gray.500">Daily Yield: {asset.dailyYield}</Text>
                    <Text color="gray.500">Market Trend: {asset.marketTrend}</Text>
                    <Text color="green.500" fontWeight="bold">Withdrawable Amount: {asset.depositedAmount.toFixed(2)} {asset.name}</Text>
                  </Box>
                  <Box>
                    <Tooltip label="Manage Asset" aria-label="Manage Asset">
                      <IconButton
                        icon={<FaChartLine />}
                        variant="outline"
                        colorScheme="purple"
                        onClick={() => handleAssetSelect(asset)}
                      />
                    </Tooltip>
                  </Box>
                </HStack>

                <Collapse in={expandedAssetId === asset.id}>
                  <Box mt={4}>
                    <Divider />
                    <Box my={4}>
                      <Text fontSize="md" fontWeight="bold">Volatility: {asset.volatility}</Text>
                      <Text fontSize="md">Recent News: {asset.recentNews}</Text>
                      <Text fontSize="md">ROI: {asset.roi}</Text>
                    </Box>
                    <Box mb={4}>{renderChart(asset.historicalData)}</Box>
                    <Button
                      leftIcon={<FaChartLine />}
                      colorScheme="purple"
                      variant="outline"
                      size="sm"
                      onClick={onOpen}
                    >
                      View Chart
                    </Button>
                  </Box>
                </Collapse>
              </Box>
            ))}
          </SimpleGrid>
        )}

        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Total Portfolio Value: ${totalPortfolioValue.toLocaleString()}
          </Text>
          <Progress value={(totalPortfolioValue / 100000) * 100} colorScheme="teal" mt={2} />
        </Box>

        {/* Asset Allocation Pie Chart */}
        <Box mt={4} mb={6} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">Asset Allocation</Text>
          <Box mt={2} height="400px" width="100%" mx="auto">
            {renderPieChart()}
          </Box>
        </Box>

        {/* Deposit/Withdraw Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Manage Asset - {selectedAsset?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Text fontSize="lg" fontWeight="bold">Deposit/Withdraw</Text>
                <FormControl>
                  <FormLabel>Deposit Amount</FormLabel>
                  <NumberInput
                    value={depositAmount}
                    onChange={(valueString) => setDepositAmount(parseFloat(valueString))}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
                <FormControl>
                  <FormLabel>Withdraw Amount</FormLabel>
                  <NumberInput
                    value={withdrawAmount}
                    onChange={(valueString) => setWithdrawAmount(parseFloat(valueString))}
                    min={0}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleDeposit}>
                Deposit
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleWithdraw}>
                Withdraw
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default MyAssets;

