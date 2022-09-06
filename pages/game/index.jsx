import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import Layout from '../../components/Layout';
import MiniCarousel from '../../components/MiniCarousel';
import Rating from '../../components/Rating';

function GameList({ firstCategory, secondCategory, thirdCategory }) {
  return (
    <Layout>
      <Head>
        <title>Games</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgColor="#242424">
        <Box
          bgImage="/assets/bg-landing.png"
          bgSize="50%"
          bgPosition="bottom right"
          bgRepeat="no-repeat"
        >
          <VStack
            justifyContent="center"
            alignItems="center"
            p="100px 0 50px 0"
            gap="50px"
          >
            <Flex
              w={['90%', '90%', '80%', '1100px']}
              justifyContent="center"
              columns={['2', '6']}
              gap="25px"
              padding={['40px', '60px']}
              bgColor="rgba(85, 85, 85, 0.25)"
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
                  Indie
                </Text>
              </Flex>
              <Box w="100%">
                <MiniCarousel catGames={firstCategory} />
              </Box>
            </Flex>

            <Flex
              w={['90%', '90%', '80%', '1100px']}
              justifyContent="center"
              columns={['2', '6']}
              gap="25px"
              padding={['40px', '60px']}
              bgColor="rgba(85, 85, 85, 0.25)"
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
                  FPS
                </Text>
              </Flex>
              <Box w="100%">
                <MiniCarousel catGames={thirdCategory} />
              </Box>
            </Flex>

            <Flex
              w={['90%', '90%', '80%', '1100px']}
              justifyContent="center"
              columns={['2', '6']}
              gap="25px"
              padding={['40px', '60px']}
              bgColor="rgba(85, 85, 85, 0.25)"
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
                {secondCategory.results.map((data) => (
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
}
export async function getServerSideProps() {
  const { data: firstCategory } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&genres=indie&page_size=20`
  );

  const { data: secondCategory } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&genres=role-playing-games-rpg&page_size=20`
  );

  const { data: thirdCategory } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&genres=shooter&page_size=20`
  );

  return {
    props: { firstCategory, secondCategory, thirdCategory }, // will be passed to the page component as props
  };
}

export default GameList;
