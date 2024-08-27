import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
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
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Divider,
  InputGroup,
  InputLeftElement,
  Icon,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { FaSyncAlt, FaChartLine, FaLock, FaSearch } from 'react-icons/fa';
import BTCIcon from 'assets/img/icons/BTC.png';
import ETHIcon from 'assets/img/icons/ETH.png';
import USDTIcon from 'assets/img/icons/USDT.png';
import DAIIcon from 'assets/img/icons/DAI.png';
import BNBIcon from 'assets/img/icons/BNB.png';
import ADAIcon from 'assets/img/icons/ADA.png';
import DOTIcon from 'assets/img/icons/DOT.png';
import LINKIcon from 'assets/img/icons/LINK.png';
import AAVEIcon from 'assets/img/icons/AAVE.jpg';
import UNIIcon from 'assets/img/icons/UNI.png';

// Przykładowe dane z ikonami
const sampleAssets = [
  { id: '1', name: 'Bitcoin', icon: BTCIcon, allocation: 30, currentValue: 26000 },
  { id: '2', name: 'Ethereum', icon: ETHIcon, allocation: 25, currentValue: 1700 },
  { id: '3', name: 'Tether', icon: USDTIcon, allocation: 20, currentValue: 1.00 },
  { id: '4', name: 'DAI', icon: DAIIcon, allocation: 15, currentValue: 1.00 },
  { id: '5', name: 'Binance Coin', icon: BNBIcon, allocation: 10, currentValue: 300 },
];

const PortfolioManagement = () => {
  const [assets, setAssets] = useState(sampleAssets);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [rebalanceAmount, setRebalanceAmount] = useState(0);
  const [yieldSuggestions, setYieldSuggestions] = useState([]);
  const [riskAssessment, setRiskAssessment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');

  const handleRebalance = () => {
    if (selectedAsset && rebalanceAmount > 0) {
      const newAssets = assets.map((asset) =>
        asset.id === selectedAsset.id
          ? { ...asset, allocation: Math.min(100, asset.allocation + rebalanceAmount) }
          : asset
      );
      setAssets(newAssets);
      setRebalanceAmount(0);
      onClose();
    } else {
      setError('Invalid asset or rebalance amount');
    }
  };

  const fetchYieldSuggestions = () => {
    // Replace with actual API call or logic to fetch yield optimization suggestions
    setYieldSuggestions([
      { id: '1', name: 'Staking ETH', yield: '5.0%' },
      { id: '2', name: 'Liquidity Mining BTC-ETH', yield: '4.5%' },
    ]);
  };

  const fetchRiskAssessment = () => {
    // Replace with actual API call or logic to fetch risk assessment
    setRiskAssessment('Your portfolio has a high exposure to volatile assets. Consider diversifying into stablecoins.');
  };

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card width="400px" p={4} borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="stretch" bg={bgColor} p={4} borderRadius="md">
        {/* Error Handling */}
        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Portfolio Overview */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>Portfolio Overview</Text>
          <InputGroup mb={4}>
            <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="sm"
            />
          </InputGroup>
          <Table variant="simple">
            <TableCaption>Portfolio Allocation</TableCaption>
            <Thead>
              <Tr>
                <Th>Asset</Th>
                <Th isNumeric>Allocation (%)</Th>
                <Th isNumeric>Current Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredAssets.map((asset) => (
                <Tr key={asset.id}>
                  <Td>
                    <HStack spacing={2}>
                      <img src={asset.icon} alt={asset.name} style={{ width: '24px', height: '24px' }} />
                      <Text fontSize="sm">{asset.name}</Text>
                    </HStack>
                  </Td>
                  <Td isNumeric>{asset.allocation}%</Td>
                  <Td isNumeric>${asset.currentValue.toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        <Divider my={4} />

        {/* Asset Rebalancing */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>Asset Rebalancing</Text>
          <HStack spacing={3} mb={3} flexWrap="wrap">
            <Select
              placeholder="Select asset"
              onChange={(e) => setSelectedAsset(assets.find((asset) => asset.id === e.target.value))}
              width="150px"
              size="sm"
            >
              {filteredAssets.map((asset) => (
                <option key={asset.id} value={asset.id}>
                  <HStack spacing={2}>
                    <img src={asset.icon} alt={asset.name} style={{ width: '20px', height: '20px' }} />
                    <Text fontSize="sm">{asset.name}</Text>
                  </HStack>
                </option>
              ))}
            </Select>
            <FormControl width="100px">
              <FormLabel fontSize="sm">Rebalance (%)</FormLabel>
              <NumberInput
                value={rebalanceAmount}
                onChange={(valueString) => setRebalanceAmount(parseFloat(valueString))}
                min={0}
                max={100}
              >
                <NumberInputField fontSize="sm" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <Button
              colorScheme="blue"
              onClick={onOpen}
              isDisabled={!selectedAsset}
              leftIcon={<FaSyncAlt />}
              size="sm"
            >
              Rebalance
            </Button>
          </HStack>
        </Box>

        <Divider my={4} />

        {/* Yield Optimization */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>Yield Optimization</Text>
          <Button colorScheme="teal" onClick={fetchYieldSuggestions} leftIcon={<FaChartLine />} size="sm" width="100%">
            Fetch Suggestions
          </Button>
          <Stack spacing={2} mt={2}>
            {yieldSuggestions.map((suggestion) => (
              <Box key={suggestion.id} p={3} bg={cardBgColor} borderRadius="md">
                <Text fontWeight="bold">{suggestion.name}</Text>
                <Text>Expected Yield: {suggestion.yield}</Text>
              </Box>
            ))}
          </Stack>
        </Box>

        <Divider my={4} />

        {/* Risk Assessment */}
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>Risk Assessment</Text>
          <Button colorScheme="red" onClick={fetchRiskAssessment} leftIcon={<FaLock />} size="sm" width="100%">
            Assess Risk
          </Button>
          {riskAssessment && (
            <Box mt={2} p={3} bg={cardBgColor} borderRadius="md">
              <Text>{riskAssessment}</Text>
            </Box>
          )}
        </Box>

        {/* Asset Rebalancing Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Rebalance Asset - {selectedAsset?.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to rebalance {selectedAsset?.name} by {rebalanceAmount}%?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleRebalance}>
                Confirm
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default PortfolioManagement;

