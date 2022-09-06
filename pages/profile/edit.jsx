import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaTwitch, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { baseUrl } from '../../axios/api';
import Layout from '../../components/Layout';
import { authSelector, setUserData } from '../../store/slices/auth';
import { authOptions } from '../api/auth/[...nextauth]';

function EditProfile() {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { user } = useSelector(authSelector);
  const [isUpdateBio, setIsUpdateBio] = useState(true);
  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const [bio, setBio] = useState({
    bio: '',
    city: '',
    file: '',
  });

  const [socmed, setSocmed] = useState({
    twitter: '',
    facebook: '',
    twitch: '',
    instagram: '',
  });

  useEffect(() => {
    setSocmed({
      twitter: user?.socialMedia?.twitter ?? '',
      facebook: user?.socialMedia?.facebook ?? '',
      twitch: user?.socialMedia?.twitch ?? '',
      instagram: user?.socialMedia?.instagram ?? '',
    });
    setBio({
      bio: user?.biodata?.bio ?? '',
      city: user?.biodata?.city ?? '',
      file: '',
    });
  }, [user]);

  const handleChangeBio = (e) => {
    e.preventDefault();
    setBio({ ...bio, [e.target.name]: e.target.value });
  };

  const handleChangeSocmed = (e) => {
    e.preventDefault();
    setSocmed({ ...socmed, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    if (isUpdateBio) {
      const dataForm = new FormData();

      dataForm.append('city', bio?.city);
      dataForm.append('bio', bio?.bio);
      dataForm.append('file', bio?.file);
      try {
        const { data } = await axios.put(
          `${baseUrl}/api/v1/user/update/bio`,
          dataForm,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: session?.user?.accessToken,
            },
          }
        );

        toast({
          title: 'Succed Update Biodata Media',
          description: 'your Biodata has been updated',
          position: 'top',
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        setLoading(false);
        return dispatch(setUserData(data));
      } catch (error) {
        toast({
          title: 'Failed Update Data',
          description: 'File type must png/jpeg/jpg ',
          position: 'top',
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
    }
    const { data } = await axios.put(
      `${baseUrl}/api/v1/user/update/socmed`,
      socmed,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: session?.user?.accessToken,
        },
      }
    );

    if (!data) {
      return;
    }
    toast({
      title: 'Succed Update Social Media',
      description: 'your Social Media has been updated',
      position: 'top',
      status: 'success',
      duration: 7000,
      isClosable: true,
    });
    dispatch(setUserData(data));

    setLoading(false);
    return;
  };
  return (
    <Layout>
      <Head>
        <title>Edit Profile - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgColor="#242424">
        <VStack gap="70px">
          <VStack position="relative">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="flex-start"
              w={['100%', '85%']}
              mt="30px"
            >
              <Image
                h={['150px', '500px']}
                objectFit="cover"
                objectPosition="bottom center"
                borderRadius="30px"
                width="1600px"
                src="/assets/banner-homepage9.png"
                alt="banner image for edit page"
              />
            </Box>
            <Box w="80%" position="absolute" bottom={['-40px', '-50px']}>
              <Flex //ini atas profile
                borderRadius={['20px', '40px']}
                h={['80px', '100px']}
                bgColor="rgba(64, 64, 64, 0.4)"
                backdropFilter="blur( 11px )"
                gap="0px"
                justifyContent="space-around"
                alignItems="center"
                w="100%"
              >
                <Box
                  display={['none', 'flex']}
                  gap="20px"
                  fontSize={[10, 15, 20, 25]}
                >
                  <Link href={user?.socialMedia?.facebook ?? '/'}>
                    <FaFacebook color="white" />
                  </Link>
                  <Link href={user?.socialMedia?.twitter ?? '/'}>
                    <FaTwitter color="white" />
                  </Link>
                  <Link href={user?.socialMedia?.instagram ?? '/'}>
                    <FaInstagram color="white" />
                  </Link>
                  <Link href={user?.socialMedia?.twitch ?? '/'}>
                    <FaTwitch color="white" />
                  </Link>
                </Box>
              </Flex>
            </Box>
          </VStack>

          <Flex
            justifyContent="center"
            alignItems="flex-start"
            w={['90%', '', '85%', '70%']}
            gap="30px"
            direction={['column-reverse', 'row']}
            flexWrap={['wrap', 'nowrap']}
          >
            <Flex gap="50px" w="100%" h="100%">
              <Flex
                w="100%"
                padding={['10px', '', '15px', '20px']}
                bgColor="whiteAlpha.200"
                color="black"
                borderRadius="40px"
              >
                <Box color="white" px="50px" w="100%">
                  <Tabs variant="solid-rounded" colorScheme="messenger">
                    <TabList color="white">
                      <Tab
                        mr={3}
                        onSelect={{ background: 'red' }}
                        onClick={() => setIsUpdateBio(true)}
                      >
                        <Text color="white">Edit Bio</Text>
                      </Tab>
                      <Tab onClick={() => setIsUpdateBio(false)}>
                        <Text color="white">Edit Social Media</Text>
                      </Tab>
                    </TabList>
                    <form onSubmit={handleSend}>
                      <TabPanels>
                        <TabPanel>
                          <VStack rowGap={4} w={['100%', '500px']} mt={4}>
                            <Input
                              placeholder="City"
                              value={bio.city}
                              name="city"
                              onChange={handleChangeBio}
                              size="md"
                              color="white"
                              fontSize="14px"
                            />
                            <Input
                              placeholder="Bio"
                              value={bio.bio}
                              name="bio"
                              onChange={handleChangeBio}
                              size="md"
                              color="white"
                              fontSize="14px"
                            />

                            <input
                              onChange={(e) => {
                                setBio({ ...bio, file: e.target.files[0] });
                              }}
                              name="file"
                              type="file"
                            />
                            <Button
                              type="submit"
                              isLoading={loading}
                              colorScheme="messenger"
                            >
                              Submit
                            </Button>
                          </VStack>
                        </TabPanel>

                        <TabPanel>
                          <VStack rowGap={4} w={['100%', '500px']} mt={4}>
                            <Input
                              value={socmed.twitter}
                              name="twitter"
                              placeholder="Twitter Link"
                              onChange={handleChangeSocmed}
                              size="md"
                              color="white"
                              fontSize="14px"
                            />
                            <Input
                              value={socmed.instagram}
                              name="instagram"
                              placeholder="Instagram Link"
                              onChange={handleChangeSocmed}
                              size="md"
                              color="white"
                              fontSize="14px"
                            />
                            <Input
                              value={socmed.twitch}
                              name="twitch"
                              placeholder="Twitch Link"
                              onChange={handleChangeSocmed}
                              size="md"
                              color="white"
                              fontSize="14px"
                            />
                            <Input
                              value={socmed.facebook}
                              name="facebook"
                              placeholder="Facebook Link"
                              onChange={handleChangeSocmed}
                              size="md"
                              fontSize="14px"
                              color="white"
                            />
                            <Button
                              type="submit"
                              isLoading={loading}
                              colorScheme="messenger"
                            >
                              Submit
                            </Button>
                          </VStack>
                        </TabPanel>
                      </TabPanels>
                    </form>
                  </Tabs>
                </Box>
              </Flex>
            </Flex>
            <Flex gap="50px" w={['100%', '', '60%', '40%']}>
              <Box
                w={['100%', '100%']}
                borderRadius="40px"
                py={'50px'}
                color="white"
                // h="300px"

                bgColor="whiteAlpha.200"
                overflow="scroll"
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <Flex justifyContent="center" mb="10px">
                  <Heading as="h3" fontSize="xl">
                    {user?.username}
                  </Heading>
                </Flex>
                <Box direction="column">
                  <Flex w="100%" direction="column">
                    <Image
                      margin="10px auto 10px auto"
                      boxSize={['90px', '90px']}
                      borderRadius={
                        user?.biodata?.profilePict ? '50%' : undefined
                      }
                      src={
                        user?.biodata?.profilePict
                          ? user?.biodata?.profilePict
                          : '/assets/user-avatar.png'
                      }
                      alt="user avatar for edit page"
                    />

                    <Box textAlign="center">
                      <Text fontWeight="bold">{user?.email}</Text>
                      <Box
                        display={['none', 'flex']}
                        justifyContent="center"
                        textAlign="center"
                        gap="30px"
                        mt="10px"
                      >
                        <Box>
                          <Text fontWeight="700">50</Text>
                          <Text fontSize="sm"> Friends</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="700">
                            {user?.biodata?.totalScore}
                          </Text>
                          <Text fontSize="sm"> Score</Text>
                        </Box>
                        <Box>
                          <Text fontWeight="700">25h</Text>
                          <Text fontSize="sm"> Play</Text>
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                </Box>
              </Box>
            </Flex>
          </Flex>
        </VStack>
      </Box>
    </Layout>
  );
}
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

  return {
    props: {},
  };
}

export default EditProfile;
