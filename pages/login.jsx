import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { getCsrfToken, signIn } from 'next-auth/react';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import LoginRegisterHeader from '../components/header/LoginRegisterHeader';

import LoginRegisterFooter from '../components/LoginRegisterFooter';
import { authOptions } from './api/auth/[...nextauth]';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: true,
      },
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

const Login = ({ csrfToken }) => {
  const { error } = useRouter().query;
  const [loading, setLoading] = useState();

  const [player, setPlayer] = useState({
    password: '',
    email: '',
  });

  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Username Or Password invalid',
        position: 'top',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleChange = (e) => {
    e.preventDefault();
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    try {
      await signIn('credentials', {
        email: player.email,
        password: player.password,
        callbackUrl: '/dashboard',
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Login - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Box bgGradient="linear-gradient(114.38deg, #FFFFFFFF 5.41%, #C9D5FFD9 129.3%)">
        <LoginRegisterHeader />
        <Flex
          bgImg="../assets/bg-login.png"
          h="100vh"
          justifyContent="center"
          alignItems="center"
          bgSize="45%"
          bgPosition="bottom left"
          bgRepeat="no-repeat"
          textAlign="center"
          fontSize="xl"
        >
          <HStack
            bgGradient="linear-gradient(257.67deg, rgba(201, 86, 255, 0) 0.12%, rgba(201, 86, 255, 0.04) 93.58%)"
            w="80%"
            h="60%"
            backdropFilter="blur( 11px )"
            p={[4, 2]}
            borderRadius="3xl"
          >
            <Box
              display={{ xl: 'flex' }}
              w="100%"
              h="100%"
              padding={['10px', '50px']}
              justifyContent="space-between"
              alignItems="baseline"
            >
              <Box
                w={['100%', '100%', '100%', '45%']}
                alignItems="baseline"
                alignContent="start"
              >
                <Text
                  color="#525252"
                  textAlign={['center', 'start']}
                  fontWeight="bold"
                  fontStyle="italic"
                  fontSize={['sm', 'md', 'lg', '56px']}
                  mb={4}
                  mt={[4, 0, 0]}
                >
                  Welcome to our Community
                </Text>

                <Text
                  textAlign={['center', 'start']}
                  color="#525252"
                  fontSize={['xs', 'sm']}
                  mt={['', '30px']}
                  mb={4}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis quod nam ut, quia optio iure minima atque. Atque,
                  fuga suscipit.
                </Text>
              </Box>
              <Box w={['100%', '100%', '100%', '30%']} ml={['', '', '', '2%']}>
                <form onSubmit={onSubmit}>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <VStack alignItems="flex-start" rowGap="20px">
                    <Heading fontSize="xl" color="#525252">
                      Sign in for an account
                    </Heading>
                    <Input
                      name="email"
                      value={player.email}
                      type="email"
                      placeholder="email"
                      h="50px"
                      pl="30px"
                      fontSize="sm"
                      bgColor="#E8E0FF"
                      borderRadius="xl"
                      border="transparent"
                      onChange={handleChange}
                      required
                    />
                    <Input
                      value={player.password}
                      name="password"
                      placeholder="password"
                      type="password"
                      h="50px"
                      pl="30px"
                      fontSize="sm"
                      bgColor="#E8E0FF"
                      borderRadius="xl"
                      border="transparent"
                      onChange={handleChange}
                      required
                    />
                    <Checkbox>
                      <Text fontSize={['sm', 'md']} color="#959BAA">
                        Remember this account
                      </Text>
                    </Checkbox>
                  </VStack>
                  <Flex
                    flexDirection="column"
                    rowGap="15px"
                    justifyContent="start"
                  >
                    <Button
                      w="100%"
                      h="50px"
                      bgColor="#B10BFF"
                      color="white"
                      fontSize="sm"
                      type="submit"
                      borderRadius="20px"
                      boxShadow="lg"
                    >
                      Login
                    </Button>
                    <NextLink href="/forgot-password" passHref>
                      <Link
                        textAlign="start"
                        fontSize={['sm', 'md']}
                        color="#959BAA"
                        to="/forgot-password"
                      >
                        Forgot Password
                      </Link>
                    </NextLink>
                  </Flex>
                </form>
              </Box>
            </Box>
          </HStack>
        </Flex>
        <LoginRegisterFooter />
      </Box>
    </>
  );
};

export default Login;
