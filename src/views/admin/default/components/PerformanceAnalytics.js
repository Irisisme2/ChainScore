import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Card,
  Select,
  Stack,
  Tag,
  Button,
  Input,
  IconButton,
  TableCaption,
  Image
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, ResponsiveContainer, Legend } from 'recharts';
import { FaDownload, FaSortUp, FaSortDown } from 'react-icons/fa';

// Import icons
import BTC from 'assets/img/icons/BTC.png';
import USDT from 'assets/img/icons/USDT.png';
import BUSD from 'assets/img/icons/BUSD.png';
import ETH from 'assets/img/icons/ETH.png';
import BNB from 'assets/img/icons/BNB.png';

// Sample data for transaction history
const transactionData = [
  { date: '2024-08-01', type: 'Deposit', amount: '$500.00', asset: BTC },
  { date: '2024-08-05', type: 'Withdrawal', amount: '$200.00', asset: ETH },
  { date: '2024-08-10', type: 'Loan', amount: '$1,000.00', asset: USDT },
  { date: '2024-08-15', type: 'Repayment', amount: '$300.00', asset: BNB },
  { date: '2024-08-20', type: 'Deposit', amount: '$400.00', asset: BUSD },
  { date: '2024-08-25', type: 'Withdrawal', amount: '$150.00', asset: BTC },
  { date: '2024-08-30', type: 'Loan', amount: '$750.00', asset: ETH },
];

// Updated sample data for interest rate trends with real assets
const interestRateData = [
  { date: 'Jan', BTC: 4.5, ETH: 3.9, USDT: 0.2 },
  { date: 'Feb', BTC: 4.7, ETH: 4.1, USDT: 0.2 },
  { date: 'Mar', BTC: 4.6, ETH: 4.2, USDT: 0.2 },
  { date: 'Apr', BTC: 4.8, ETH: 4.3, USDT: 0.2 },
  { date: 'May', BTC: 4.7, ETH: 4.1, USDT: 0.2 },
  { date: 'Jun', BTC: 4.9, ETH: 4.4, USDT: 0.2 },
  { date: 'Jul', BTC: 5.0, ETH: 4.5, USDT: 0.2 },
  { date: 'Aug', BTC: 4.8, ETH: 4.3, USDT: 0.2 },
];

const PerformanceAnalytics = () => {
  const [filterType, setFilterType] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const tableBg = useColorModeValue('gray.50', 'gray.700');
  const chartLineColors = ['#8884d8', '#82ca9d', '#ff7300']; // Colors for BTC, ETH, USDT

  // Filtered transaction data based on selected type
  const filteredData = filterType === 'All' ? transactionData : transactionData.filter((tx) => tx.type === filterType);

  // Paginate transaction data
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Sort transactions
  const sortData = (data) => {
    return [...data].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.date.localeCompare(b.date);
      } else {
        return b.date.localeCompare(a.date);
      }
    });
  };

  return (
    <Card p={6} borderRadius="md" shadow="md" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Performance Analytics
      </Text>

      {/* Transaction History */}
      <Box mb={6}>
        <Flex justify="space-between" align="center" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Transaction History
          </Text>
          <Stack direction="row" spacing={4}>
            <Select
              placeholder="Filter by type"
              width="200px"
              onChange={(e) => setFilterType(e.target.value)}
              value={filterType}
            >
              <option value="All">All</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Loan">Loan</option>
              <option value="Repayment">Repayment</option>
            </Select>
            <Input
              placeholder="Search..."
              width="200px"
              onChange={(e) => console.log('Search:', e.target.value)}
            />
          </Stack>
        </Flex>
        <Table variant="simple" bg={tableBg}>
          <TableCaption>
            Showing {paginatedData.length} of {filteredData.length} transactions
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Date
                <IconButton
                  aria-label="Sort"
                  icon={sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  variant="link"
                  ml={2}
                />
              </Th>
              <Th>Type</Th>
              <Th>Asset</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortData(paginatedData).map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.date}</Td>
                <Td>
                  <Tag colorScheme={transaction.type === 'Deposit' ? 'green' : transaction.type === 'Withdrawal' ? 'red' : 'blue'}>
                    {transaction.type}
                  </Tag>
                </Td>
                <Td>
                  <Image src={transaction.asset} alt={transaction.type} boxSize="30px" />
                </Td>
                <Td>{transaction.amount}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex mt={4} justify="space-between">
          <Button onClick={() => setPage(page > 1 ? page - 1 : 1)} disabled={page === 1}>Previous</Button>
          <Button onClick={() => setPage(page < Math.ceil(filteredData.length / rowsPerPage) ? page + 1 : page)} disabled={page === Math.ceil(filteredData.length / rowsPerPage)}>Next</Button>
          <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
            <option value={5}>5 rows per page</option>
            <option value={10}>10 rows per page</option>
            <option value={15}>15 rows per page</option>
          </Select>
          <IconButton aria-label="Export" icon={<FaDownload />} onClick={() => alert('Export functionality coming soon')} />
        </Flex>
      </Box>

      {/* Interest Rate Trends */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Interest Rate Trends
        </Text>
        <Stack direction="row" mb={4} spacing={4}>
          <Text>Select Asset:</Text>
          <Select
            width="200px"
            onChange={(e) => setSelectedAsset(e.target.value)}
            value={selectedAsset}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="USDT">Tether (USDT)</option>
          </Select>
        </Stack>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={interestRateData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip formatter={(value, name) => [`${value}%`, name]} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="BTC"
              stroke={chartLineColors[0]}
              dot={false}
              name={
                <Flex align="center">
                  <Image src={BTC} alt="BTC" boxSize="20px" mr={2} />
                  Bitcoin (BTC)
                </Flex>
              }
            />
            <Line
              type="monotone"
              dataKey="ETH"
              stroke={chartLineColors[1]}
              dot={false}
              name={
                <Flex align="center">
                  <Image src={ETH} alt="ETH" boxSize="20px" mr={2} />
                  Ethereum (ETH)
                </Flex>
              }
            />
            <Line
              type="monotone"
              dataKey="USDT"
              stroke={chartLineColors[2]}
              dot={false}
              name={
                <Flex align="center">
                  <Image src={USDT} alt="USDT" boxSize="20px" mr={2} />
                  Tether (USDT)
                </Flex>
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
};

export default PerformanceAnalytics;
