import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import NextLink from 'next/link';

function GameDetails() {
  const gameDetails = {
    name: 'Paper Rock Scissor',
    category: 'Arcade',
    year: '2022',
    gamerating: 'For All',
  };

  return (
    <Box bgColor="#242424">
      <Box
        bgImage="/assets/bg-game-detail.png"
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <NextLink href="/dashboard" passHref>
          <Link
            position="absolute"
            zIndex="299"
            top={['0', '20px']}
            padding="10px 10px"
            borderRadius="5px"
            bg="gray.200"
            _hover={{ textDecor: 'none' }}
            left={['0', '20px']}
          >
            <AiOutlineHome />
          </Link>
        </NextLink>
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          h="100vh"
          gap={['10px', '150px']}
        >
          <Flex
            width={['90%', '65%']}
            height={['80%', '75%']}
            justifyContent="center"
            alignItems="center"
            bgColor="rgba(100, 99, 99, 0.70)"
            borderRadius="40px"
            position="relative"
          >
            <Flex
              justifyContent={['center', 'space-between']}
              alignItems="center"
              w={['90%', '100%']}
              right={['', '150px']}
              position="absolute"
              flexWrap="wrap"
            >
              <Image
                boxSize={['70%', '45%']}
                filter="drop-shadow(0 1mm 5mm rgba(48, 48, 48, 1))"
                src="/assets/games/prs-thumbnail.png"
                alt="game"
              />

              <Box w={['100', '50%']} mt="40px">
                <Heading
                  as="h1"
                  fontSize={['2xl', '4xl']}
                  color="white"
                  mb={['15px', '40px']}
                >
                  {gameDetails.name}
                </Heading>

                <Box fontSize={['md', 'xl']} color="white" textAlign="justify">
                  <table>
                    <tbody>
                      <tr>
                        <th>Category </th>
                        <td>: {gameDetails.category}</td>
                      </tr>
                      <tr>
                        <th>Year </th>
                        <td>: {gameDetails.year}</td>
                      </tr>
                      <tr>
                        <th>Game Rating </th>
                        <td>: {gameDetails.gamerating}</td>
                      </tr>
                    </tbody>
                  </table>

                  <Text mt="5px" fontSize={['xl', 'xl']}>
                    Description :
                  </Text>
                  <Text fontSize="md" noOfLines={[4, 5]}>
                    {`A simultaneous, zero-sum game, it has three possible
                    outcomes: a draw, a win or a loss. A player who decides to
                    play rock will beat another player who has chosen scissors
                    "rock crushes scissors" or "breaks scissors" or sometimes
                    "blunts scissors", but will lose to one who has played paper
                    "paper covers rock"; a play of paper will lose to a play of
                    scissors "scissors cuts paper". If both players choose the
                    same shape, the game is tied and is usually immediately
                    replayed to break the tie`}
                  </Text>
                </Box>
                <Flex justifyContent="center">
                  <NextLink href={`/play/game-prs`} passHref>
                    <Button
                      w={['120px', '200px']}
                      h={['40px', '50px']}
                      bgColor="#B10BFF"
                      color="white"
                      borderRadius="40px"
                      fontSize="sm"
                      mt="20px"
                    >
                      Play Now
                    </Button>
                  </NextLink>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default GameDetails;
