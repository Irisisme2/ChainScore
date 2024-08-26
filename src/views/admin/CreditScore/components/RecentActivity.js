import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  VStack,
  HStack,
  Badge,
  Icon,
  useColorModeValue,
  Tooltip,
  Button,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  CheckboxGroup,
  Checkbox,
  Alert,
  AlertIcon,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  useBreakpointValue,
  Divider,
} from '@chakra-ui/react';
import { FaArrowDown, FaArrowUp, FaSearch, FaDownload } from 'react-icons/fa';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Card from 'components/card/Card';
import Chart from 'react-apexcharts'; // For displaying charts

// Expanded sample data for recent activities
const mockActivities = [
  { id: 1, date: '2024-08-20', type: 'Deposit', description: 'Salary deposit', amount: 1000, impact: 'positive', account: 'Savings' },
  { id: 2, date: '2024-08-21', type: 'Withdrawal', description: 'ATM withdrawal', amount: 200, impact: 'negative', account: 'Checking' },
  { id: 3, date: '2024-08-22', type: 'Loan Repayment', description: 'Monthly loan repayment', amount: 150, impact: 'positive', account: 'Loan Account' },
  { id: 4, date: '2024-08-23', type: 'Investment', description: 'Purchased stocks', amount: 500, impact: 'neutral', account: 'Investments' },
  { id: 5, date: '2024-08-24', type: 'Deposit', description: 'Bonus deposit', amount: 200, impact: 'positive', account: 'Checking' },
  { id: 6, date: '2024-08-25', type: 'Withdrawal', description: 'Grocery shopping', amount: 80, impact: 'negative', account: 'Checking' },
  { id: 7, date: '2024-08-26', type: 'Deposit', description: 'Freelance payment', amount: 300, impact: 'positive', account: 'Savings' },
  { id: 8, date: '2024-08-27', type: 'Loan Disbursement', description: 'New loan disbursement', amount: 1000, impact: 'neutral', account: 'Loan Account' },
  { id: 9, date: '2024-08-28', type: 'Investment', description: 'Purchased cryptocurrency', amount: 400, impact: 'neutral', account: 'Investments' },
  { id: 10, date: '2024-08-29', type: 'Withdrawal', description: 'Rent payment', amount: 1200, impact: 'negative', account: 'Checking' },
  { id: 11, date: '2024-08-30', type: 'Deposit', description: 'Interest earned', amount: 50, impact: 'positive', account: 'Savings' },
  { id: 12, date: '2024-08-31', type: 'Loan Repayment', description: 'Partial loan repayment', amount: 300, impact: 'positive', account: 'Loan Account' },
];

// Number of activities per page
const ACTIVITIES_PER_PAGE = 5;

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const positiveColor = useColorModeValue('green.500', 'green.300');
  const negativeColor = useColorModeValue('red.500', 'red.300');
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  // Fetch activities on mount
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        setActivities(mockActivities);
        setLoading(false);
      } catch (error) {
        toast({
          title: 'Error fetching activities.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    getData();
  }, [toast]);

  // Handle pagination
  const paginatedActivities = activities.slice(
    (currentPage - 1) * ACTIVITIES_PER_PAGE,
    currentPage * ACTIVITIES_PER_PAGE
  );

  // Handle filtering and sorting
  const filteredActivities = paginatedActivities
    .filter((activity) =>
      (filter === 'all' || activity.impact === filter) &&
      (selectedCategories.length === 0 || selectedCategories.includes(activity.category)) &&
      activity.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      return a.amount - b.amount;
    });

  // Handle showing details modal
  const showDetails = (activity) => {
    setSelectedActivity(activity);
    onOpen();
  };

  // Handle page change
  const handlePageChange = (direction) => {
    if (direction === 'next' && (currentPage * ACTIVITIES_PER_PAGE < activities.length)) {
      setCurrentPage(currentPage + 1);
    }
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Card p={6} borderRadius="md" shadow="md" bg={bgColor}>
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Recent Activity
        </Text>
        <InputGroup w="30%">
          <Input
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <InputRightElement children={<FaSearch color="gray.500" />} />
        </InputGroup>
      </Flex>

      {/* Filters and Sorting */}
      <Flex direction={{ base: 'column', md: 'row' }} mb={4} gap={4}>
        <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
          <HStack spacing={4}>
            <Checkbox value="Deposits">Deposits</Checkbox>
            <Checkbox value="Withdrawals">Withdrawals</Checkbox>
            <Checkbox value="Loans">Loans</Checkbox>
            <Checkbox value="Investments">Investments</Checkbox>
          </HStack>
        </CheckboxGroup>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by impact"
          maxWidth="200px"
        >
          <option value="all">All</option>
          <option value="positive">Positive Impact</option>
          <option value="negative">Negative Impact</option>
        </Select>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          placeholder="Sort by"
          maxWidth="200px"
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </Select>
      </Flex>

      {/* Recent Activity Table */}
      {loading ? (
        <Flex justify="center" align="center" height="200px">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <VStack spacing={4} align="stretch">
          <Table variant="simple" size={tableSize}>
            <TableCaption>Recent transactions affecting your credit score</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>Description</Th>
                <Th isNumeric>Amount</Th>
                <Th>Impact</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredActivities.map((activity) => (
                <Tr key={activity.id}>
                  <Td>{activity.date}</Td>
                  <Td>{activity.type}</Td>
                  <Td>{activity.description}</Td>
                  <Td isNumeric>${activity.amount}</Td>
                  <Td>
                    <Badge colorScheme={activity.impact === 'positive' ? 'green' : 'red'}>
                      {activity.impact}
                    </Badge>
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={() => showDetails(activity)}
                    >
                      View Details
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      )}

      {/* Pagination Controls */}
      <Flex mt={6} justify="space-between" align="center">
        <Button
          colorScheme="blue"
          onClick={() => handlePageChange('prev')}
          isDisabled={currentPage === 1}
        >
          <ChevronLeftIcon /> Previous
        </Button>
        <Text>
          Page {currentPage} of {Math.ceil(activities.length / ACTIVITIES_PER_PAGE)}
        </Text>
        <Button
          colorScheme="blue"
          onClick={() => handlePageChange('next')}
          isDisabled={currentPage * ACTIVITIES_PER_PAGE >= activities.length}
        >
          Next <ChevronRightIcon />
        </Button>
      </Flex>

      {/* Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Activity Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedActivity && (
              <Box>
                <Text fontWeight="bold">Type:</Text> {selectedActivity.type}
                <Text fontWeight="bold">Description:</Text> {selectedActivity.description}
                <Text fontWeight="bold">Date:</Text> {selectedActivity.date}
                <Text fontWeight="bold">Amount:</Text> ${selectedActivity.amount}
                <Text fontWeight="bold">Impact:</Text>
                <Badge
                  colorScheme={
                    selectedActivity.impact === 'positive' ? 'green' : 'red'
                  }
                >
                  {selectedActivity.impact}
                </Badge>
                {/* Additional details can be added here */}
                <Divider my={4} />
                <Text fontWeight="bold">Category Trends:</Text>
                <Chart
                  options={{
                    chart: {
                      id: 'activity-trends',
                    },
                    xaxis: {
                      categories: ['Deposits', 'Withdrawals', 'Loans', 'Investments'],
                    },
                  }}
                  series={[
                    {
                      name: 'Activities',
                      data: [10, 20, 5, 7], // Sample data
                    },
                  ]}
                  type="bar"
                />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default RecentActivity;

