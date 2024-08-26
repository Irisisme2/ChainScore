import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Stack,
  Divider,
  useColorModeValue,
  Progress
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import BTC from 'assets/img/icons/BTC.png';
import USDT from 'assets/img/icons/USDT.png';
import BUSD from 'assets/img/icons/BUSD.png';
import ETH from 'assets/img/icons/ETH.png';
import BNB from 'assets/img/icons/BNB.png';
import PersonalLoanIcon from 'assets/img/icons/PersonalLoan.png'; // Replace with actual path
import CarLoanIcon from 'assets/img/icons/CarLoan.png'; // Replace with actual path
import HomeLoanIcon from 'assets/img/icons/HomeLoan.png'; // Replace with actual path

const assets = [
  { name: 'Bitcoin', symbol: 'BTC', value: '$25,000', icon: BTC },
  { name: 'Tether', symbol: 'USDT', value: '$1,000', icon: USDT },
  { name: 'Binance USD', symbol: 'BUSD', value: '$500', icon: BUSD },
  { name: 'Ethereum', symbol: 'ETH', value: '$2,000', icon: ETH },
  { name: 'Binance Coin', symbol: 'BNB', value: '$300', icon: BNB },
];

const loans = [
  { name: 'Personal Loan', amount: '$5,000', interest: '5.5%', term: '12 months', collateral: 'None', icon: PersonalLoanIcon },
  { name: 'Car Loan', amount: '$20,000', interest: '4.2%', term: '24 months', collateral: 'Vehicle', icon: CarLoanIcon },
  { name: 'Home Loan', amount: '$150,000', interest: '3.8%', term: '360 months', collateral: 'Property', icon: HomeLoanIcon },
];

const AssetDetails = ({ asset }) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold">{asset.name} ({asset.symbol})</Text>
    <Text fontSize="md">Current Value: {asset.value}</Text>
    <Text fontSize="md">Details about {asset.name}...</Text>
    {/* Add more details about the asset here */}
  </Box>
);

const LoanDetails = ({ loan }) => (
  <Box>
    <Text fontSize="lg" fontWeight="bold">{loan.name}</Text>
    <Text fontSize="md">Amount: {loan.amount}</Text>
    <Text fontSize="md">Interest Rate: {loan.interest}</Text>
    <Text fontSize="md">Remaining Term: {loan.term}</Text>
    <Text fontSize="md">Collateral: {loan.collateral}</Text>
    {/* Add more details about the loan here */}
  </Box>
);

const AssetAndLoanCard = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const { isOpen: isAssetOpen, onOpen: onAssetOpen, onClose: onAssetClose } = useDisclosure();
  const { isOpen: isLoanOpen, onOpen: onLoanOpen, onClose: onLoanClose } = useDisclosure();

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
    onAssetOpen();
  };

  const handleLoanClick = (loan) => {
    setSelectedLoan(loan);
    onLoanOpen();
  };

  // Example borrowing power calculation
  const creditScore = 750; // Example credit score
  const totalHoldings = 25000; // Example total holdings value
  const maxBorrowingPower = (creditScore / 850) * totalHoldings; // Basic calculation
  const currentBorrowingPower = Math.min(maxBorrowingPower, 10000); // Example limit

  return (
    <Card p={6} borderRadius="md" shadow="md" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Digital Assets & Loan Status
      </Text>
      <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align="flex-start">
        {/* Digital Assets Column */}
        <Box flex="1" mr={{ base: 0, md: 6 }} mb={{ base: 6, md: 0 }}>
          <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
            Digital Assets
          </Text>
          <Flex direction="column" align="center">
            {assets.map((asset) => (
              <Flex
                key={asset.symbol}
                direction="column"
                align="center"
                mb={6}
                cursor="pointer"
                onClick={() => handleAssetClick(asset)}
              >
                <Image src={asset.icon} alt={asset.symbol} boxSize="100px" mb={2} />
                <Text fontSize="lg" fontWeight="bold">{asset.name}</Text>
                <Text fontSize="md" color="gray.500">{asset.value}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>

        <Divider orientation="vertical" />

        {/* Loan Status Column */}
        <Box flex="1" ml={{ base: 0, md: 6 }}>
          <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
            Loan Status
          </Text>
          <Flex direction="column" align="center">
            {loans.map((loan) => (
              <Flex
                key={loan.name}
                direction="column"
                align="center"
                mb={6}
                cursor="pointer"
                onClick={() => handleLoanClick(loan)}
              >
                <Image src={loan.icon} alt={loan.name} boxSize="100px" mb={2} />
                <Text fontSize="lg" fontWeight="bold">{loan.name}</Text>
                <Text fontSize="md" color="gray.500">Amount: {loan.amount}</Text>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Flex>

      {/* Modal for Asset Details */}
      <Modal isOpen={isAssetOpen} onClose={onAssetClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Asset Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedAsset && <AssetDetails asset={selectedAsset} />}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal for Loan Details */}
      <Modal isOpen={isLoanOpen} onClose={onLoanClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Loan Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedLoan && <LoanDetails loan={selectedLoan} />}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Borrowing Power */}
      <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
          Borrowing Power
        </Text>
        <Flex direction="column" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            ${currentBorrowingPower.toLocaleString()}
          </Text>
          <Progress
            value={(currentBorrowingPower / 10000) * 100}
            size="sm"
            colorScheme="blue"
            w="full"
          />
        </Flex>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Based on your credit score and current holdings, this is the maximum amount you can borrow.
        </Text>
      </Box>
    </Card>
  );
};

export default AssetAndLoanCard;
