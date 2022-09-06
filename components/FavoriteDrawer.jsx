import {
  Badge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { AiFillDelete as DeleteIcon } from 'react-icons/ai';
import { BsBookmarkHeart } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavoriteGame,
  favoriteSelector,
} from '../store/slices/favoriteGame';
import FavoriteRating from './FavoriteRating';

const FavoriteDrawer = ({ scrollState }) => {
  const dispatch = useDispatch();
  const { favorite } = useSelector(favoriteSelector);
  const [delAn, setDelAn] = useState({ id: null, ondel: false });
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        fontSize="25px"
        mr={4}
        color={scrollState ? 'white' : 'black'}
        onClick={onOpen}
        position="relative"
      >
        {favorite.length > 0 && (
          <Box
            position="absolute"
            fontSize="9px"
            p="4px 8px"
            top="-12px"
            right="-7px"
            bg="red"
            borderRadius="50%"
          >
            {favorite.length}
          </Box>
        )}
        <BsBookmarkHeart />
      </Box>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent backgroundColor="#303030" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Favorite Games</DrawerHeader>

          <DrawerBody overflowX="hidden">
            {favorite.length <= 0 && (
              <Badge borderRadius="full" px="2" bgColor="red.400">
                You have no favorite games!
              </Badge>
            )}
            {favorite.map((fav) => (
              <Flex
                as={motion.div}
                animate={{
                  opacity: 1,
                  x: delAn.id === fav.id ? 500 : 0,
                }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                key={fav.id}
              >
                <VStack
                  // divider={<StackDivider borderColor="gray.200" />}
                  spacing={4}
                  align="stretch"
                  flex={1}
                >
                  <Box
                    flex="100"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    p="3"
                    my="3"
                  >
                    <HStack flex={1}>
                      <Image
                        width="50px"
                        src={fav.thumbnail}
                        alt="drawer favorite image "
                      />

                      <Box flex={1}>
                        <Text
                          fontWeight="semibold"
                          as="h4"
                          lineHeight="tight"
                          noOfLines={1}
                        >
                          {fav.title}
                        </Text>
                        <Box display="flex" alignItems="baseline">
                          <Box
                            color="yellow.400"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            mt="1"
                          >
                            RATING :
                          </Box>
                          <Badge
                            borderRadius="full"
                            px="2"
                            ml="2"
                            bgColor="blue.400"
                          >
                            <Flex>
                              <Text mr={2}>{fav.rating}</Text>
                              <FavoriteRating rate={fav.rating} />
                            </Flex>
                          </Badge>
                        </Box>
                      </Box>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setDelAn({ id: fav.id, ondel: true });
                          setTimeout(() => {
                            dispatch(deleteFavoriteGame(fav));
                            setDelAn({ id: null, ondel: false });
                          }, 600);
                        }}
                        size="sm"
                        disabled={delAn.ondel}
                      >
                        <DeleteIcon />
                      </Button>
                    </HStack>
                  </Box>
                </VStack>
              </Flex>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FavoriteDrawer;
