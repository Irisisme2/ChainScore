import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  useColorModeValue,
  VStack,
  SimpleGrid,
  Badge,
  IconButton,
  Tooltip,
  Collapse,
  Stack,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  Spinner,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';
import { FaEdit, FaInfoCircle, FaSearch, FaRegFileAlt, FaDollarSign } from 'react-icons/fa';
import PersonalLoanIcon from 'assets/img/icons/PersonalLoan.png';
import CarLoanIcon from 'assets/img/icons/CarLoan.png';
import HomeLoanIcon from 'assets/img/icons/HomeLoan.png';
import Card from 'components/card/Card';

const MyLoans = () => {
  const [expandedLoanId, setExpandedLoanId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [repaymentAmount, setRepaymentAmount] = useState('');
  const [collateralValue, setCollateralValue] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [refinanceAmount, setRefinanceAmount] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample loan data
  const [loans, setLoans] = useState([
    {
      id: 'LOAN123',
      amount: 5000,
      interestRate: '5.0%',
      remainingTerm: '12 months',
      collateral: { type: 'Vehicle', value: '$5,000', icon: CarLoanIcon },
      status: 'On Schedule',
      description: 'Loan for purchasing a new car.',
      details: 'The vehicle used as collateral is a 2019 model sedan. Monthly payments are up-to-date.',
    },
    {
      id: 'LOAN124',
      amount: 20000,
      interestRate: '3.5%',
      remainingTerm: '24 months',
      collateral: { type: 'Home', value: '$20,000', icon: HomeLoanIcon },
      status: 'Late',
      description: 'Home loan for renovation.',
      details: 'The home used as collateral is currently undergoing renovation. Payments are overdue by 1 month.',
    },
    {
      id: 'LOAN125',
      amount: 1000,
      interestRate: '7.0%',
      remainingTerm: '6 months',
      collateral: { type: 'Personal Item', value: '$1,000', icon: PersonalLoanIcon },
      status: 'Completed',
      description: 'Personal loan for emergency expenses.',
      details: 'The personal item used as collateral is a jewelry piece. The loan has been fully repaid.',
    },
  ]);

  // Function to filter loans based on search and status
  const filteredLoans = loans.filter((loan) => {
    const matchesStatus = filterStatus === 'All' || loan.status === filterStatus;
    const matchesSearch = loan.id?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return matchesStatus && matchesSearch;
  });

  const bgColor = useColorModeValue('white', 'gray.800');
  const cardBgColor = useColorModeValue('gray.50', 'gray.700');
  const iconSize = '150px';  // Increased icon size for better visibility

  const handleToggle = (id) => {
    setExpandedLoanId(expandedLoanId === id ? null : id);
  };

  const handleAction = (action, loan) => {
    setSelectedLoan(loan);
    setSelectedAction(action);
    setLoading(false);
    setError(null);
    // Reset form values
    setRepaymentAmount('');
    setCollateralValue('');
    setNewTerm('');
    setRefinanceAmount('');
    setLoanAmount('');
    onOpen();
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate a bank API request
    setTimeout(() => {
      setLoading(false);
      if (selectedAction === 'Repay') {
        const updatedLoans = loans.map((loan) =>
          loan.id === selectedLoan.id
            ? { ...loan, amount: loan.amount - parseFloat(repaymentAmount) }
            : loan
        );
        setLoans(updatedLoans);
      } else if (selectedAction === 'Adjust Collateral') {
        const updatedLoans = loans.map((loan) =>
          loan.id === selectedLoan.id
            ? { ...loan, collateral: { ...loan.collateral, value: collateralValue } }
            : loan
        );
        setLoans(updatedLoans);
      } else if (selectedAction === 'Extend Term') {
        const updatedLoans = loans.map((loan) =>
          loan.id === selectedLoan.id
            ? { ...loan, remainingTerm: newTerm }
            : loan
        );
        setLoans(updatedLoans);
      } else if (selectedAction === 'Refinance') {
        const newLoan = {
          id: `LOAN${Date.now()}`, // Generate a new unique ID
          amount: parseFloat(refinanceAmount),
          interestRate: '5.0%', // Default value
          remainingTerm: '12 months', // Default value
          collateral: { type: 'Personal Item', value: '$1,000', icon: PersonalLoanIcon }, // Default value
          status: 'On Schedule', // Default value
          description: 'Refinanced loan',
          details: 'Details of the refinanced loan.',
        };
        const updatedLoans = loans.filter(loan => loan.id !== selectedLoan.id);
        setLoans([...updatedLoans, newLoan]);
      } else if (selectedAction === 'New Loan Request') {
        const newLoan = {
          id: `LOAN${Date.now()}`, // Generate a new unique ID
          amount: parseFloat(loanAmount),
          interestRate: '5.0%', // Default value
          remainingTerm: '12 months', // Default value
          collateral: { type: 'Personal Item', value: '$1,000', icon: PersonalLoanIcon }, // Default value
          status: 'On Schedule', // Default value
          description: 'New loan request',
          details: 'Details of the new loan request.',
        };
        setLoans([...loans, newLoan]);
      }
      onClose();
    }, 1000);
  };

  return (
    <Card p={6} borderRadius="md" shadow="md" bg={bgColor} width="1000px">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        My Loans
      </Text>

      <Flex mb={4} justify="space-between" align="center">
        <InputGroup width="300px">
          <InputLeftElement pointerEvents="none" children={<FaSearch color="gray.300" />} />
          <Input
            placeholder="Search by Loan ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Select
          width="200px"
          placeholder="Filter by Status"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="On Schedule">On Schedule</option>
          <option value="Late">Late</option>
          <option value="Completed">Completed</option>
        </Select>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {filteredLoans.map((loan) => (
          <Card
            key={loan.id}
            p={6}
            borderWidth="1px"
            borderRadius="md"
            bg={cardBgColor}
            shadow="md"
            _hover={{ bg: 'gray.200' }}
            transition="background-color 0.3s ease"
            cursor="pointer"
            width="310px"
          >
            <VStack spacing={4} align="center">
              <Image
                src={loan.collateral.icon}
                alt={loan.collateral.type}
                boxSize={iconSize}
                objectFit="contain"
                borderRadius="md"
                bg="white"
                p={2}
                boxShadow="md"
              />
              <Text fontSize="xl" fontWeight="bold" textAlign="center">
                {loan.collateral.type}
              </Text>
              <Text fontSize="md" color="gray.600" textAlign="center">
                {loan.description}
              </Text>
              <Stack spacing={2} textAlign="center">
                <Text fontSize="md">
                  <strong>Loan ID:</strong> {loan.id}
                </Text>
                <Text fontSize="md">
                  <strong>Amount Borrowed:</strong> ${loan.amount}
                </Text>
                <Text fontSize="md">
                  <strong>Interest Rate:</strong> {loan.interestRate}
                </Text>
                <Text fontSize="md">
                  <strong>Remaining Term:</strong> {loan.remainingTerm}
                </Text>
                <Text fontSize="md">
                  <strong>Collateral:</strong> {loan.collateral.value}
                </Text>
                <Badge
                  colorScheme={
                    loan.status === 'On Schedule'
                      ? 'green'
                      : loan.status === 'Late'
                      ? 'red'
                      : 'gray'
                  }
                  fontSize="sm"
                  fontWeight="bold"
                >
                  {loan.status}
                </Badge>
              </Stack>
              <Flex justify="space-between" w="full">
                <Tooltip label="Edit Loan" aria-label="Edit Loan">
                  <IconButton
                    icon={<FaEdit />}
                    aria-label="Edit Loan"
                    variant="outline"
                    colorScheme="blue"
                    isRound
                    onClick={() => handleAction('Edit', loan)}
                  />
                </Tooltip>
                <Tooltip label="View Details" aria-label="View Details">
                  <IconButton
                    icon={<FaRegFileAlt />}
                    aria-label="Loan Details"
                    variant="outline"
                    colorScheme="blue"
                    isRound
                    onClick={() => handleAction('Details', loan)}
                  />
                </Tooltip>
                <Tooltip label="Repay Loan" aria-label="Repay Loan">
                  <IconButton
                    icon={<FaDollarSign />}
                    aria-label="Repay Loan"
                    variant="outline"
                    colorScheme="teal"
                    isRound
                    onClick={() => handleAction('Repay', loan)}
                  />
                </Tooltip>
              </Flex>
              <Collapse in={expandedLoanId === loan.id}>
                <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.100" width="340px">
                  <Text fontSize="10px" fontWeight="bold">Details:</Text>
                  <Text fontSize="sm">{loan.details}</Text>
                  <Flex mt={4} justify="space-between">
                    <Button colorScheme="teal" onClick={() => handleAction('Repay', loan)}>
                      Repay Loan
                    </Button>
                    <Button colorScheme="orange" onClick={() => handleAction('Adjust Collateral', loan)}>
                      Adjust Collateral
                    </Button>
                    <Button colorScheme="blue" onClick={() => handleAction('Extend Term', loan)}>
                      Extend Term
                    </Button>
                    <Button colorScheme="purple" onClick={() => handleAction('Refinance', loan)}>
                      Refinance
                    </Button>
                  </Flex>
                </Box>
              </Collapse>
            </VStack>
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal for Loan Actions */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {loading ? 'Processing...' : `Action: ${selectedAction}`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading ? (
              <Flex justify="center" align="center">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <>
                <Text mb={4}>
                  Please provide the details for the selected action.
                </Text>
                {selectedAction === 'Repay' && (
                  <FormControl mb={4}>
                    <FormLabel>Amount to Repay</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={repaymentAmount}
                      onChange={(e) => setRepaymentAmount(e.target.value)}
                    />
                    <FormHelperText>Enter the amount you wish to repay.</FormHelperText>
                  </FormControl>
                )}
                {selectedAction === 'Adjust Collateral' && (
                  <FormControl mb={4}>
                    <FormLabel>New Collateral Value</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter new collateral value"
                      value={collateralValue}
                      onChange={(e) => setCollateralValue(e.target.value)}
                    />
                    <FormHelperText>Enter the new value for your collateral.</FormHelperText>
                  </FormControl>
                )}
                {selectedAction === 'Extend Term' && (
                  <FormControl mb={4}>
                    <FormLabel>New Term</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter new term"
                      value={newTerm}
                      onChange={(e) => setNewTerm(e.target.value)}
                    />
                    <FormHelperText>Enter the new term for the loan.</FormHelperText>
                  </FormControl>
                )}
                {selectedAction === 'Refinance' && (
                  <FormControl mb={4}>
                    <FormLabel>Amount to Refinance</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={refinanceAmount}
                      onChange={(e) => setRefinanceAmount(e.target.value)}
                    />
                    <FormHelperText>Enter the amount you wish to refinance.</FormHelperText>
                  </FormControl>
                )}
                {selectedAction === 'New Loan Request' && (
                  <>
                    <FormControl mb={4}>
                      <FormLabel>Loan Amount</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                      <FormHelperText>Enter the amount you wish to borrow.</FormHelperText>
                    </FormControl>
                    <FormControl mb={4}>
                      <FormLabel>Collateral Type</FormLabel>
                      <Select placeholder="Select collateral type">
                        <option value="Vehicle">Vehicle</option>
                        <option value="Home">Home</option>
                        <option value="Personal Item">Personal Item</option>
                      </Select>
                    </FormControl>
                  </>
                )}
                <Button colorScheme="blue" width="full" onClick={handleSubmit}>
                  Submit
                </Button>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Error Alert */}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Card>
  );
};

export default MyLoans;
