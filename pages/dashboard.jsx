import { Box, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { unstable_getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';
import Layout from '../components/Layout';
import MiniCarouselSm from '../components/MiniCarouselSm';
import { authOptions } from './api/auth/[...nextauth]';
import Rating from '../components/Rating';
import { authSelector } from '../store/slices/auth';
import { useSelector } from 'react-redux';
import BadgeComp from '../components/BadgeComp';
import RecentCarousel from '../components/RecentCarousel';
import Head from 'next/head';
import { playedSelector } from '../store/slices/playedGame';
import { baseUrl } from '../axios/api';
import moment from 'moment';

const Dashboard = ({ recomGames, popGames, friendUser }) => {
  const { user } = useSelector(authSelector);
  const { played } = useSelector(playedSelector);
  const popularGames = popGames.results;

  const userCreated = moment(`${user?.createdAt}`).format('YYYYMMDD');
  const userSince = moment(`${userCreated}`).startOf(`day`).fromNow();

  return (
    <Layout>
      <Head>
        <title>Dashboard - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgColor="#242424">
        <VStack gap="70px">
          <VStack position="relative">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              w={['100%', '85%']}
              mt="30px"
            >
              <Image
                h={['200px', '450px']}
                objectFit="cover"
                objectPosition="top center"
                borderRadius="30px"
                width="1450px"
                src="/assets/banner-homepage5.png"
                alt="banner-hompage-dashboard"
              />
            </Box>
            <Box w="80%" position="absolute" bottom={['-60px', '-50px']}>
              <Flex
                borderRadius={['20px', '40px']}
                h={['100px', '100px']}
                bgColor="rgba(64, 64, 64, 0.4)"
                backdropFilter="blur( 11px )"
                gap="0px"
                justifyContent="space-around"
                alignItems="center"
              >
                <Box
                  display={['none', 'flex']}
                  gap="20px"
                  fontSize={[10, 15, 20, 25]}
                >
                  <Link href={user?.socialMedia?.facebook ?? '#'} passHref>
                    <a>
                      <FaFacebook color="white" />
                    </a>
                  </Link>
                  <Link href={user?.socialMedia?.twitter ?? '#'}>
                    <a>
                      <FaTwitter color="white" />
                    </a>
                  </Link>
                  <Link href={user?.socialMedia?.instagram ?? '#'}>
                    <a>
                      <FaInstagram color="white" />
                    </a>
                  </Link>
                  <Link href={user?.socialMedia?.twitch ?? '#'}>
                    <a>
                      <FaTwitch color="white" />
                    </a>
                  </Link>
                </Box>
                <Box
                  display="flex"
                  position="relative"
                  bottom={['40px', '50px']}
                >
                  <VStack position="relative" gap="-100px">
                    <Image
                      mt={['-20px', '0px']}
                      boxSize={['100px', '110px']}
                      borderRadius="50%"
                      src={
                        user && user?.biodata?.profilePict
                          ? user?.biodata?.profilePict
                          : '/assets/user-avatar.png'
                      }
                      alt="image-user-avatar"
                    />
                    <Text color="white" fontWeight="bold">
                      {user?.username}
                    </Text>

                    <Text color="white" fontSize="12px">
                      Member since : {userSince}
                    </Text>
                  </VStack>
                </Box>
                <Box
                  display={['none', 'flex']}
                  justifyContent="center"
                  textAlign="center"
                  gap="30px"
                  color="white"
                >
                  <Box>
                    <Text color="white" fontWeight="700">
                      {friendUser.length}
                    </Text>
                    <Text color="white"> Friends</Text>
                  </Box>
                  <Box>
                    <Text color="white" fontWeight="700">
                      <BadgeComp score={user?.biodata?.totalScore} />
                    </Text>
                    <Text color="white"> Score</Text>
                  </Box>
                  <Box>
                    <Text color="white" fontWeight="700">
                      25h
                    </Text>
                    <Text color="white"> Play</Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </VStack>

          <Flex
            justifyContent="center"
            alignItems="flex-start"
            w={['90%', '', '85%', '1200px']}
            gap="30px"
            direction={['column-reverse', 'row']}
            flexWrap={['wrap', 'nowrap']}
          >
            <Flex direction="column" gap="50px" w="100%" h="100%">
              <Flex
                w={['100%', '100%']}
                justifyContent="center"
                padding={['10px', '20px']}
                gap="25px"
                bgColor="rgba(85, 85, 85, 0.25)"
                color="black"
                borderRadius="40px"
                flexWrap="wrap"
                direction="column"
              >
                <Flex w="100%" justifyContent="center" px={4}>
                  <Text color="white" p="5px 25px" fontSize="lg">
                    Recent Game
                  </Text>
                </Flex>
                <Flex
                  h={['300px', '400px']}
                  gap="25px"
                  p="10px"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  <Box justifyContent w={['300px', '800px']}>
                    <RecentCarousel recentGame={played} />
                  </Box>
                </Flex>
              </Flex>
              <Flex
                w={['100%', '100%']}
                justifyContent="center"
                padding={['10px', '20px']}
                gap="25px"
                bgColor="rgba(85, 85, 85, 0.25)"
                color="black"
                borderRadius="40px"
                flexWrap="wrap"
                direction="column"
              >
                <Flex justifyContent="center">
                  <Text color="white" fontSize="lg">
                    Recommendation
                  </Text>
                </Flex>
                <Flex
                  h={['300px', '400px']}
                  gap="25px"
                  p="10px"
                  justifyContent="center"
                  flexWrap="wrap"
                >
                  <Box justifyContent w={['300px', '800px']}>
                    <MiniCarouselSm catGames={recomGames} />
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Flex gap="50px" w={['100%', '', '60%', '40%']}>
              <Box
                w={['100%', '100%']}
                borderRadius="40px"
                padding="20px 10px"
                h={['550px', '750px']}
                bgColor="whiteAlpha.50"
                color="white"
                overflow="scroll"
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Flex justifyContent="center" mb="10px">
                  <Heading as="h3" fontSize="xl">
                    Friend List
                  </Heading>
                </Flex>

                <Box w="100%" gap="5px">
                  {friendUser?.map((data) => (
                    <Link
                      href={`/profile/${data?.username}`}
                      key={data.biodata.id}
                      _hover={{ textDecoration: 'none' }}
                      passHref
                    >
                      <Flex
                        as="a"
                        py={2}
                        borderRadius="15px"
                        alignItems="center"
                        _hover={{
                          textDecoration: 'none',
                          bg: 'gray.500',
                          transition: '0.5s',
                        }}
                        px={2}
                        columnGap={4}
                        w="100%"
                      >
                        <Image
                          w="50px"
                          src={
                            data?.biodata?.profilePict
                              ? data?.biodata?.profilePict
                              : '/assets/user-avatar.png'
                          }
                          borderRadius={
                            data?.biodata?.profilePict ? '50%' : undefined
                          }
                          alt="user-avatar"
                        />

                        <Text w="100%">{data?.username} </Text>
                        <BadgeComp score={data?.biodata?.totalScore} />
                      </Flex>
                    </Link>
                  ))}
                </Box>
              </Box>
            </Flex>
          </Flex>

          <Flex
            w={['90%', '', '85%', '70%']}
            justifyContent="center"
            gap="25px"
            padding={['40px', '60px']}
            bgColor="rgba(85, 85, 85, 0.25)"
            color="black"
            borderRadius="40px"
            flexWrap="wrap"
            direction="column"
          >
            <Flex justifyContent="center">
              <Text color="white" fontSize="lg">
                Popular Games
              </Text>
            </Flex>
            <Flex gap="30px" justifyContent="center" flexWrap="wrap">
              {popularGames.map((data) => (
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
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, authOptions);
  // console.log('session', session);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const { data: friendUser } = await axios.get(
    `${baseUrl}/api/v1//user/friendlist`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: session?.user?.accessToken,
      },
    }
  );

  const { data: recomGames } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&page_size10`
  );
  const { data: popGames } = await axios.get(
    `https://api.rawg.io/api/games?key=6d425f0f68c54e1b81e2f433d5b09e67&page=2`
  );

  return {
    props: { recomGames, popGames, friendUser },
  };
}

export default Dashboard;
