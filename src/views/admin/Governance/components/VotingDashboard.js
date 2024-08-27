import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Collapse,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Input,
  useToast,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { MdInfo, MdThumbUp, MdThumbDown, MdNotInterested, MdHistory, MdSearch, MdRefresh, MdExitToApp } from "react-icons/md";
import Card from "components/card/Card";

// Przykładowe dane propozycji
const initialProposals = [
  {
    id: '1',
    title: 'Proposal for New Feature',
    description: 'A proposal to introduce a new feature to improve user experience.',
    status: 'Open',
    proposer: 'John Doe',
    proposalText: 'This proposal suggests implementing a new feature that...',
    communityDiscussions: ['Discussion 1', 'Discussion 2'],
    votes: { For: 120, Against: 30, Abstain: 10 },
  },
  {
    id: '2',
    title: 'Update Governance Rules',
    description: 'A proposal to update the current governance rules for better transparency.',
    status: 'Closed',
    proposer: 'Jane Smith',
    proposalText: 'This proposal aims to modify the existing rules to...',
    communityDiscussions: ['Discussion A', 'Discussion B'],
    votes: { For: 80, Against: 50, Abstain: 20 },
  },
  {
    id: '3',
    title: 'Budget Allocation for Marketing',
    description: 'A proposal to allocate additional funds for marketing efforts.',
    status: 'Open',
    proposer: 'Alice Johnson',
    proposalText: 'This proposal includes the allocation of additional funds...',
    communityDiscussions: ['Discussion X', 'Discussion Y'],
    votes: { For: 90, Against: 40, Abstain: 15 },
  },
];

const VotingDashboard = () => {
  const [proposals, setProposals] = useState(initialProposals);
  const [filteredProposals, setFilteredProposals] = useState(initialProposals);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [votingHistory, setVotingHistory] = useState([]);
  const [voteStatus, setVoteStatus] = useState(null);
  const [historyFilter, setHistoryFilter] = useState('All');
  const [historySort, setHistorySort] = useState('Date Descending');
  const [searchQuery, setSearchQuery] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    // Mock function to simulate fetching proposals and voting history from an API
    const fetchProposalsAndHistory = () => {
      // Fetch proposals and history here
      // setProposals(fetchedProposals);
      // setVotingHistory(fetchedHistory);
    };

    fetchProposalsAndHistory();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredProposals(proposals.filter(proposal =>
        proposal.title.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProposals(proposals);
    }
  }, [searchQuery, proposals]);

  const handleVote = (proposalId, voteType) => {
    const newProposals = proposals.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          votes: {
            ...proposal.votes,
            [voteType]: (proposal.votes[voteType] || 0) + 1
          }
        };
      }
      return proposal;
    });

    setProposals(newProposals);

    const newVote = {
      proposalId,
      vote: voteType,
      date: new Date().toISOString().split('T')[0],
    };

    setVotingHistory([newVote, ...votingHistory]);

    setVoteStatus(`Voted ${voteType} on proposal ${proposalId}`);
    toast({
      title: "Vote Submitted",
      description: `You have voted ${voteType} on proposal ${proposalId}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDetails = (proposal) => {
    setSelectedProposal(proposal);
    setIsModalOpen(true);
  };

  const handleFilterChange = (event) => {
    setHistoryFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setHistorySort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRefresh = () => {
    // Logic to refresh the proposals and history
    toast({
      title: "Data Refreshed",
      description: "The proposals and history have been refreshed.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    // Logic to handle user logout
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredHistory = votingHistory.filter(vote =>
    historyFilter === 'All' || vote.proposalId === historyFilter
  );

  const sortedHistory = filteredHistory.sort((a, b) => {
    if (historySort === 'Date Ascending') {
      return new Date(a.date) - new Date(b.date);
    }
    return new Date(b.date) - new Date(a.date);
  });

  const totalVotes = proposals.reduce((total, proposal) =>
    total + Object.values(proposal.votes).reduce((a, b) => a + b, 0), 0);

  return (
    <Card>
      <VStack spacing={4} align="stretch" p={4} borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold">Voting Dashboard</Text>

        {/* Summary Widget */}
        <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="gray.50">
          <Text fontSize="lg" fontWeight="bold">Summary</Text>
          <Divider my={2} />
          <HStack spacing={4} mb={2}>
            <Badge colorScheme="blue" p={2}>{filteredProposals.length} Active Proposals</Badge>
            <Badge colorScheme="green" p={2}>{totalVotes} Total Votes</Badge>
          </HStack>
          <Button
            leftIcon={<MdRefresh />}
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={handleRefresh}
          >
            Refresh Data
          </Button>
        </Box>

        {/* Search and Filter */}
        <HStack spacing={4} mb={4}>
          <Input
            placeholder="Search Proposals..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="sm"
            width="full"
          />
          <Select placeholder="Filter by Proposal" onChange={handleFilterChange} size="sm">
            <option value="All">All</option>
            {proposals.map(proposal => (
              <option key={proposal.id} value={proposal.id}>{proposal.title}</option>
            ))}
          </Select>
          <Select placeholder="Sort by" onChange={handleSortChange} size="sm">
            <option value="Date Ascending">Date Ascending</option>
            <option value="Date Descending">Date Descending</option>
          </Select>
          <Button
            leftIcon={<MdExitToApp />}
            colorScheme="red"
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </HStack>

        {/* Active Proposals List */}
        <Stack spacing={4}>
          {filteredProposals.map((proposal) => (
            <Box key={proposal.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <HStack justify="space-between">
                <Box>
                  <Text fontSize="lg" fontWeight="bold">{proposal.title}</Text>
                  <Text color="gray.600">{proposal.description}</Text>
                  <Text color="gray.500" mt={2}>Status: {proposal.status}</Text>
                </Box>
                <Box>
                  <Tooltip label="View Details" aria-label="View Details">
                    <Button
                      leftIcon={<MdInfo />}
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      onClick={() => handleDetails(proposal)}
                    >
                      Details
                    </Button>
                  </Tooltip>
                  <HStack mt={2} spacing={2}>
                    <Tooltip label="Vote For" aria-label="Vote For">
                      <Button
                        leftIcon={<MdThumbUp />}
                        colorScheme="green"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(proposal.id, 'For')}
                      >
                        For
                      </Button>
                    </Tooltip>
                    <Tooltip label="Vote Against" aria-label="Vote Against">
                      <Button
                        leftIcon={<MdThumbDown />}
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(proposal.id, 'Against')}
                      >
                        Against
                      </Button>
                    </Tooltip>
                    <Tooltip label="Abstain" aria-label="Abstain">
                      <Button
                        leftIcon={<MdNotInterested />}
                        colorScheme="gray"
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(proposal.id, 'Abstain')}
                      >
                        Abstain
                      </Button>
                    </Tooltip>
                  </HStack>
                </Box>
              </HStack>
            </Box>
          ))}
        </Stack>

        {/* Proposal Details Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Proposal Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedProposal && (
                <VStack spacing={4} align="stretch">
                  <Text fontSize="lg" fontWeight="bold">Title:</Text>
                  <Text mb={2}>{selectedProposal.title}</Text>
                  <Text fontSize="lg" fontWeight="bold">Description:</Text>
                  <Text mb={2}>{selectedProposal.description}</Text>
                  <Text fontSize="lg" fontWeight="bold">Proposer:</Text>
                  <Text mb={2}>{selectedProposal.proposer}</Text>
                  <Text fontSize="lg" fontWeight="bold">Full Proposal Text:</Text>
                  <Text mb={4}>{selectedProposal.proposalText}</Text>
                  <Text fontSize="lg" fontWeight="bold">Community Discussions:</Text>
                  <VStack spacing={2}>
                    {selectedProposal.communityDiscussions.map((discussion, index) => (
                      <Text key={index} color="blue.500">{discussion}</Text>
                    ))}
                  </VStack>
                  <Box mt={4}>
                    <Text fontSize="lg" fontWeight="bold">Voting Results:</Text>
                    <Text>For: {selectedProposal.votes.For} ({((selectedProposal.votes.For / Object.values(selectedProposal.votes).reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)</Text>
                    <Text>Against: {selectedProposal.votes.Against} ({((selectedProposal.votes.Against / Object.values(selectedProposal.votes).reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)</Text>
                    <Text>Abstain: {selectedProposal.votes.Abstain} ({((selectedProposal.votes.Abstain / Object.values(selectedProposal.votes).reduce((a, b) => a + b, 0)) * 100).toFixed(2)}%)</Text>
                  </Box>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={() => setIsModalOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Voting History */}
        <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="md" mt={4}>
          <Text fontSize="lg" fontWeight="bold">Voting History</Text>
          <Divider my={2} />
          <Stack spacing={2}>
            <HStack mb={4}>
              <Select placeholder="Filter by Proposal" onChange={handleFilterChange} size="sm">
                <option value="All">All</option>
                {proposals.map(proposal => (
                  <option key={proposal.id} value={proposal.id}>{proposal.title}</option>
                ))}
              </Select>
              <Select placeholder="Sort by" onChange={handleSortChange} size="sm">
                <option value="Date Ascending">Date Ascending</option>
                <option value="Date Descending">Date Descending</option>
              </Select>
            </HStack>
            {sortedHistory.map((vote, index) => {
              const proposal = proposals.find(p => p.id === vote.proposalId);
              return (
                <Box key={index} p={2} borderWidth="1px" borderRadius="md" borderColor="gray.200">
                  <Text fontSize="md" fontWeight="bold">Proposal: {proposal ? proposal.title : 'Unknown'}</Text>
                  <Text fontSize="md">Vote: {vote.vote}</Text>
                  <Text fontSize="md" color="gray.500">Date: {vote.date}</Text>
                </Box>
              );
            })}
          </Stack>
          <Button
            leftIcon={<MdHistory />}
            colorScheme="teal"
            variant="outline"
            mt={4}
          >
            View Full History
          </Button>
        </Box>
      </VStack>
    </Card>
  );
};

export default VotingDashboard;
