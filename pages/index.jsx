import React from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import {
  Box,
  Flex,
  Button,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Carousel from '../components/Carousel';
import Layout from '../components/Layout';
import MiniCarousel from '../components/MiniCarouselSm';
import Rating from '../components/Rating';

const LandingPage = ({ newGame, popGame, pinnedGames }) => {
  const gameCarousel = pinnedGames.results;
  const popularGame = popGame.results;

  return (
    <Layout>
      <Head>
        <title>Home - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgColor="#242424">
        <Box
          bgImage="/assets/bg-landing.png"
          backgroundAttachment="fixed"
          bgPosition="bottom right"
          bgRepeat="no-repeat"
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            p="100px 0 50px 0"
            backdropFilter="blur(10px)"
            gap="50px"
          >
            <Box
              w={['85%', '', '80%', '1200px']}
              borderRadius="40px"
              justifyContent="center"
              alignItems="center"
            >
              <Carousel pinnedGames={gameCarousel} />
            </Box>
            <Stack
              direction={['column', 'row']}
              gap={['10px', '50px']}
              padding={['20px', '30px']}
              w={['90%', '', '85%', '1100px']}
              bgColor="rgba(48, 48, 48, 0.85)"
              color="white"
              borderRadius="40px"
              justifyContent="center"
            >
              <Flex gap="30px">
                <Flex justifyContent="center" w={['100%', '30%']}>
                  <Image
                    width={240}
                    height={250}
                    src="/assets/games/prs-thumbnail.png"
                    alt="assets-game-prs-thumbnail"
                  />
                </Flex>
                <Box
                  direction={['column', 'column', 'row', 'row']}
                  w={['100%', '60%']}
                  h={['80%', '80%', '80%', '100%']}
                  overflow="hidden"
                >
                  <Heading as="h3" size={['sm', 'lg']} mb="10px">
                    Paper Rock Scissors
                  </Heading>
                  <Text
                    textAlign="justify"
                    noOfLines={[4, 7]}
                    fontSize={['14px']}
                  >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Reiciendis exercitationem nemo quo, molestias fugiat
                    quibusdam illo saepe ducimus velit, fugit ex distinctio eos
                    enim sit aliquam. Quisquam, reprehenderit eos. Odio
                    voluptate est ad deserunt at vitae neque inventore animi
                    ratione consequuntur? Quis temporibus exercitationem in
                    vitae quos itaque dignissimos unde porro. Beatae odit
                    aspernatur repellat porro commodi illum, officiis quidem?
                    Esse sed beatae, dolorem commodi modi ullam perferendis,
                    voluptate quaerat quidem velit nobis. Dolores enim
                    voluptatem iste quod quisquam quaerat at quidem aut beatae
                    numquam corrupti laboriosam eius, ad quae maiores eveniet
                    natus illum sapiente dolore? Expedita temporibus sunt cum.
                  </Text>
                  <Flex justifyContent="center" columnGap="15px">
                    <Link href="/prs-detail" passHref>
                      <Button
                        as="a"
                        w={['120px', '180px']}
                        h={['40px', '40px']}
                        colorScheme="purple"
                        borderRadius="40px"
                        fontSize="sm"
                        mt="20px"
                      >
                        Detail
                      </Button>
                    </Link>
                    <Link href="/play/game-prs" passHref>
                      <Button
                        as="a"
                        w={['120px', '180px']}
                        h={['40px', '40px']}
                        colorScheme="purple"
                        color="white"
                        borderRadius="40px"
                        fontSize="sm"
                        mt="20px"
                      >
                        Play Now
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Flex>
            </Stack>

            <Flex justifyContent="center" w={['', '100%']} position="relative">
              <Flex
                w={['100%', '1100px']}
                justifyContent="center"
                padding={['10px', '20px']}
                gap="25px"
                bgColor="rgba(48, 48, 48, 0.85)"
                color="black"
                borderRadius="40px"
                flexWrap="wrap"
                direction="column"
              >
                <Flex
                  gap="30px"
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <VStack
                    justifyContent="center"
                    borderRadius="20px"
                    p="20px"
                    bgColor="#B10BFF"
                    h="300px"
                    ml="50px"
                    color="white"
                    w="250px"
                    alignItems="center"
                    display={['none', 'flex']}
                  >
                    <Text fontSize="xl">New Game Release</Text>
                    <Text fontSize="sm" textAlign="justify">
                      is a list of newest game that you can play here, from
                      creator to you
                    </Text>
                  </VStack>
                  <Flex
                    h={['300px', '400px']}
                    gap="25px"
                    p="10px"
                    justifyContent="center"
                    flexWrap="wrap"
                  >
                    <Box
                      alignItems="center"
                      justifyContent="center"
                      w={['300px', '650px']}
                      mr={['', '50px']}
                    >
                      <MiniCarousel catGames={newGame} />
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              w={['90%', '90%', '80%', '1100px']}
              justifyContent="center"
              columns={['2', '6']}
              gap="25px"
              padding={['40px', '60px']}
              bgColor="rgba(48, 48, 48, 0.85)"
              color="black"
              borderRadius="40px"
              flexWrap="wrap"
              position="relative"
            >
              <Flex
                w={['250px', '400px']}
                h={['50px', '60px']}
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top={['-25px', '-30px']}
                bgColor="#B10BFF"
                color="white"
                borderRadius="40px"
              >
                <Text fontSize="2xl" fontWeight="bold">
                  Popular Games
                </Text>
              </Flex>
              <Flex gap="30px" justifyContent="center" flexWrap="wrap">
                {popularGame.map((data) => (
                  <Link key={data.id} href={`/game/${data.id}`} passHref>
                    <Box
                      as="a"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="start"
                      w={['120px', '200px']}
                      h={['200px', '380px']}
                      p="20px"
                      borderRadius="10px"
                      cursor="pointer"
                    >
                      <VStack>
                        <Box
                          _hover={{
                            transform: 'scale(1.1)',
                            transition: 'transform 0.7s',
                            bgColor: '#4c4c4c',
                          }}
                          w={['110px', '160px']}
                          h={['110px', '230px']}
                          bgImg={data?.background_image}
                          bgSize="cover"
                          bgPosition="center"
                          borderRadius="7px"
                          justifyContent="center"
                        />
                      </VStack>
                      <Text
                        textAlign={['center', 'start']}
                        color="white"
                        mt="10px"
                        fontSize="sm"
                      >
                        {data?.name}
                      </Text>

                      <Box
                        textAlign={['center', 'start']}
                        color="white"
                        fontSize="sm"
                      >
                        <Rating rate={data.rating} />
                      </Box>
                    </Box>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </VStack>
        </Box>
      </Box>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data: newGame } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&ordering=released&page=3&page_size=10`
  );

  const { data: popGame } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&tags=40847&page_size=20`
  );

  const { data: pinnedGames } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&page_size=3`
  );

  return {
    props: { newGame, popGame, pinnedGames }, // will be passed to the page component as props
  };
}

export default LandingPage;
