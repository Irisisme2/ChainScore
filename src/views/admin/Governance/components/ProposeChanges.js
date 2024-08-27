import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Stack,
  Text,
  useToast,
  VStack,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";

const ProposeChanges = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rationale, setRationale] = useState("");
  const [benefits, setBenefits] = useState("");
  const [type, setType] = useState("Feature");
  const [category, setCategory] = useState("General");
  const [attachment, setAttachment] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    if (!title || !description || !rationale || !benefits) {
      toast({
        title: "Missing Fields",
        description: "Please fill out all fields before submitting.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Simulate a form submission
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Proposal Submitted",
        description: "Your proposal has been submitted for review.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      // Clear form fields
      setTitle("");
      setDescription("");
      setRationale("");
      setBenefits("");
      setAttachment(null);
      setCategory("General");
    }, 2000);
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // Max 5MB
      setAttachment(file);
    } else {
      toast({
        title: "File Too Large",
        description: "The file size should be less than 5MB.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setAttachment(null);
    }
  };

  const openPreviewModal = () => {
    setPreviewModalOpen(true);
  };

  const closePreviewModal = () => {
    setPreviewModalOpen(false);
  };

  return (
    <Card>
      <VStack spacing={4} align="stretch" p={4} borderRadius="md">
        <Text fontSize="2xl" fontWeight="bold">Propose Changes</Text>
        <Divider my={2} />

        <FormControl id="proposal-category">
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Feature">Feature</option>
            <option value="Improvement">Improvement</option>
            <option value="Bug Fix">Bug Fix</option>
          </Select>
        </FormControl>

        <FormControl id="proposal-type" isRequired>
          <FormLabel>Proposal Type</FormLabel>
          <Select
            placeholder="Select proposal type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Feature">Feature</option>
            <option value="Improvement">Improvement</option>
            <option value="Bug Fix">Bug Fix</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl id="proposal-title" isRequired>
          <FormLabel>Proposal Title</FormLabel>
          <Input
            placeholder="Enter the title of your proposal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        <FormControl id="proposal-description" isRequired>
          <FormLabel>Proposal Description</FormLabel>
          <Textarea
            placeholder="Enter a detailed description of the proposed change or initiative"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl id="rationale" isRequired>
          <FormLabel>Rationale and Benefits</FormLabel>
          <Textarea
            placeholder="Explain the rationale behind your proposal and its expected benefits to the platform or community"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
          />
        </FormControl>

        <FormControl id="proposal-attachment">
          <FormLabel>Attach Files (Optional)</FormLabel>
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleAttachmentChange}
            iconSpacing={1}
            rightIcon={<FaFileUpload />}
          />
          {attachment && (
            <Box mt={2}>
              <Text>Attached file: {attachment.name}</Text>
            </Box>
          )}
        </FormControl>

        <Stack spacing={4} direction="row" align="center" mt={4}>
          <Button
            colorScheme="teal"
            onClick={openPreviewModal}
          >
            Preview Proposal
          </Button>
          <Button
            colorScheme="teal"
            onClick={handleSubmit}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Submit Proposal"}
          </Button>
        </Stack>

        {/* Preview Modal */}
        <Modal isOpen={previewModalOpen} onClose={closePreviewModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Preview Proposal</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box>
                <Text fontSize="lg" fontWeight="bold">Title:</Text>
                <Text>{title}</Text>
                <Text fontSize="lg" fontWeight="bold">Description:</Text>
                <Text>{description}</Text>
                <Text fontSize="lg" fontWeight="bold">Rationale and Benefits:</Text>
                <Text>{rationale}</Text>
                <Text fontSize="lg" fontWeight="bold">Type:</Text>
                <Text>{type}</Text>
                <Text fontSize="lg" fontWeight="bold">Category:</Text>
                <Text>{category}</Text>
                {attachment && (
                  <Box mt={2}>
                    <Text fontSize="lg" fontWeight="bold">Attached File:</Text>
                    <Text>{attachment.name}</Text>
                  </Box>
                )}
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={closePreviewModal}>
                Close Preview
              </Button>
              <Button colorScheme="teal" onClick={handleSubmit} isDisabled={loading}>
                {loading ? <Spinner size="sm" /> : "Submit Proposal"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Card>
  );
};

export default ProposeChanges;
