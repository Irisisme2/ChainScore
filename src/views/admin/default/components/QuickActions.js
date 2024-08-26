import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Stack,
  Divider,
} from '@chakra-ui/react';
import Card from 'components/card/Card';

const QuickActions = () => {
  const { isOpen: isRequestOpen, onOpen: onRequestOpen, onClose: onRequestClose } = useDisclosure();
  const { isOpen: isRepayOpen, onOpen: onRepayOpen, onClose: onRepayClose } = useDisclosure();
  const { isOpen: isCollateralOpen, onOpen: onCollateralOpen, onClose: onCollateralClose } = useDisclosure();

  const handleRequestLoan = () => {
    // Handle request loan logic here
    console.log('Request Loan Submitted');
    onRequestClose();
  };

  const handleRepayLoan = () => {
    // Handle repay loan logic here
    console.log('Repay Loan Submitted');
    onRepayClose();
  };

  const handleAdjustCollateral = () => {
    // Handle adjust collateral logic here
    console.log('Adjust Collateral Submitted');
    onCollateralClose();
  };

  return (
    <Card p={6} borderRadius="md" shadow="md" bg="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        Quick Actions
      </Text>
      <Stack spacing={4}>
        {/* Request Loan Button */}
        <Button colorScheme="blue" onClick={onRequestOpen}>
          Request Loan
        </Button>

        {/* Repay Loan Button */}
        <Button colorScheme="green" onClick={onRepayOpen}>
          Repay Loan
        </Button>

        {/* Adjust Collateral Button */}
        <Button colorScheme="orange" onClick={onCollateralOpen}>
          Adjust Collateral
        </Button>
      </Stack>

      {/* Request Loan Modal */}
      <Modal isOpen={isRequestOpen} onClose={onRequestClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request New Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Loan Amount</FormLabel>
              <Input type="number" placeholder="Enter amount" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Purpose</FormLabel>
              <Textarea placeholder="Describe the purpose of the loan" />
            </FormControl>
            <Button colorScheme="blue" onClick={handleRequestLoan}>
              Submit Loan Request
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Repay Loan Modal */}
      <Modal isOpen={isRepayOpen} onClose={onRepayClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Repay Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Loan ID</FormLabel>
              <Input type="text" placeholder="Enter loan ID" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Repayment Amount</FormLabel>
              <Input type="number" placeholder="Enter amount" />
            </FormControl>
            <Button colorScheme="green" onClick={handleRepayLoan}>
              Submit Repayment
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Adjust Collateral Modal */}
      <Modal isOpen={isCollateralOpen} onClose={onCollateralClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Adjust Collateral</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Loan ID</FormLabel>
              <Input type="text" placeholder="Enter loan ID" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>New Collateral</FormLabel>
              <Input type="text" placeholder="Enter new collateral details" />
            </FormControl>
            <Button colorScheme="orange" onClick={handleAdjustCollateral}>
              Submit Adjustment
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default QuickActions;
