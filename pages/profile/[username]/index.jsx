import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';
import { baseUrl } from '../../../axios/api';
import BadgeComp from '../../../components/BadgeComp';
import Layout from '/components/Layout';
import NotFoundPage from '/components/UserNotFound';

function OtherUser() {
  const router = useRouter();
  const { username = ' ' } = router.query;
  const { data: session } = useSession();
  const user = session?.user;

  const [detailUser, setDetailUser] = useState({});
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const dataUser = async () => {
      const { data } = await axios.get(
        `${baseUrl}/api/v1/user/profile/${username}`
      );

      if (!data) {
        setIsAvailable(false);
        return;
      }
      if (data) {
        setIsAvailable(true);
        setDetailUser(data);
      }
    };
    dataUser();
  }, [username]);

  return (
    <Layout>
      <Head>
        <title>{username ? username + ' Profile' : 'profile not found'}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!isAvailable ? (
        <NotFoundPage />
      ) : (
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
                  h={['150px', '500px']}
                  objectFit="cover"
                  objectPosition="top center"
                  borderRadius="30px"
                  width="1450px"
                  src="/assets/banner-homepage.png"
                  alt="banner for homapge user profile"
                />
              </Box>
              <Box w={['80%']} position="absolute" bottom={['-40px', '-50px']}>
                <Flex
                  borderRadius={['20px', '40px']}
                  h={['80px', '100px']}
                  bgColor="rgba(64, 64, 64, 0.4)"
                  backdropFilter="blur( 11px )"
                  gap="0px"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="2xl" color="white">
                    {detailUser?.username} Profile
                  </Text>
                  <Box
                    display="flex"
                    position="relative"
                    bottom={['40px', '50px']}
                  ></Box>
                </Flex>
              </Box>
            </VStack>

            <Flex
              justifyContent="center"
              alignItems="flex-start"
              w={['90%', '90%', '80%', '60%']}
              gap="30px"
              borderRadius="40px"
              bgColor="rgba(64, 64, 64, 0.9)"
              backdropFilter="blur( 11px )"
              padding="50px"
              color="white"
            >
              <Flex w="70%" direction="column">
                <Image
                  margin="10px auto 10px auto"
                  boxSize={['100px', '180px']}
                  borderRadius={
                    detailUser?.biodata?.profilePict ? '50%' : undefined
                  }
                  src={
                    detailUser?.biodata?.profilePict
                      ? detailUser?.biodata?.profilePict
                      : '/assets/user-avatar.png'
                  }
                  alt="avatar user profile"
                />

                <Box textAlign="center" pb={4}>
                  <Text fontWeight="bold">{detailUser?.username} </Text>
                  <Box
                    display="flex"
                    justifyContent="center"
                    textAlign="center"
                    gap="30px"
                    mt="10px"
                  >
                    <Box>
                      <Text fontWeight="700">0</Text>
                      <Text fontSize="sm"> Friends</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="700">
                        <BadgeComp score={detailUser?.biodata?.totalScore} />
                      </Text>
                      <Text fontSize="sm"> Score</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="700">0 h</Text>
                      <Text fontSize="sm"> Play</Text>
                    </Box>
                  </Box>
                  <Text mt="30px" fontSize="sm" lineHeight={['5', '5']}>
                    {detailUser?.biodata?.bio}
                  </Text>
                  <Flex mt="50px" justifyContent="center">
                    <Box display="flex" gap="20px">
                      <Link href={detailUser?.socialMedia?.facebook}>
                        <FaFacebook size={30} />
                      </Link>
                      <Link href={detailUser?.socialMedia?.twitter}>
                        <FaTwitter size={30} />
                      </Link>
                      <Link href={detailUser?.socialMedia?.instagram}>
                        <FaInstagram size={30} />
                      </Link>
                      <Link href={detailUser?.socialMedia?.twitch}>
                        <FaTwitch size={30} />
                      </Link>
                    </Box>
                  </Flex>
                  {username === user?.username && (
                    <Text mt={8}>
                      <Link
                        href={`/profile/edit`}
                        mt={12}
                        py={2}
                        px={8}
                        bg="blue.400"
                        transition="0.3s"
                        _hover={{
                          bg: 'blue.500',
                          transition: '0.5s',
                          textDecoration: 'none',
                          color: 'gray.500',
                        }}
                      >
                        Edit Profile
                      </Link>
                    </Text>
                  )}
                </Box>
              </Flex>
            </Flex>
          </VStack>
        </Box>
      )}
    </Layout>
  );
}

export default OtherUser;
