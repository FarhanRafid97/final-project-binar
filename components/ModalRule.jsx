import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  VStack,
  Text,
} from '@chakra-ui/react';

export default function ModalComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>!</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rule</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack textAlign="start">
              <Text>Rock Beat Scissors</Text>
              <Text>Scissors Beat Paper</Text>
              <Text>Paper Beat Rock</Text>
              <Text p="5px">Player Who Get 3 Point Win The Game</Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
