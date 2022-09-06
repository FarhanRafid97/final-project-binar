import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import LoginRegisterHeader from '../components/header/LoginRegisterHeader';
import LoginRegisterFooter from '../components/LoginRegisterFooter';
import Head from 'next/head';
import { signIn } from 'next-auth/react';
import { baseUrl } from '../axios/api';
import { unstable_getServerSession } from 'next-auth';
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
    props: {},
  };
}

function Register() {
  const [player, setPlayer] = useState({
    username: '',
    email: '',
    password: '',
  });
  const toast = useToast();

  const handleChange = (e) => {
    setPlayer({ ...player, [e.target.name]: e.target.value });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/register`,
        player
      );

      if (data) {
        await signIn('credentials', {
          email: player.email,
          password: player.password,
          callbackUrl: '/dashboard',
        });

        toast({
          title: 'Succed Create Account',
          description: 'your account has been created',
          position: 'top',
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        setPlayer({
          username: '',
          email: '',
          password: '',
        });
        return;
      }
    } catch (err) {
      toast({
        id: toast,
        title: 'Failed Create Account',
        description: err.response.data.msg,
        position: 'top',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
    }
  };
  return (
    <Box bgGradient="linear-gradient(114.38deg, #FFFFFF 5.41%, rgba(201, 213, 255, 0.85) 129.3%)">
      <Head>
        <title>Register - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <LoginRegisterHeader />
      <Flex
        bgImg="/assets/bg-register.png"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        bgSize="45%"
        bgPosition="bottom right"
        bgRepeat="no-repeat"
        textAlign="center"
        fontSize="xl"
      >
        <HStack
          bgGradient="linear-gradient(257.67deg, rgba(201, 86, 255, 0) 0.12%, rgba(201, 86, 255, 0.04) 93.58%)"
          w="80%"
          h="80%"
          p={[4, 2]}
          backdropFilter="blur( 11px )"
          borderRadius="3xl"
        >
          <Flex
            w="100%"
            direction={[
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'row',
            ]}
            h="80%"
            padding={['10px', '50px']}
            justifyContent="space-between"
          >
            <Box w={['100%', '100%', '100%', '35%']} ml={['', '', '', '5%']}>
              <form onSubmit={handleSend}>
                <VStack alignItems="flex-start" rowGap={['15px', '20px']}>
                  <Heading fontSize="xl" textAlign="center" color="#525252">
                    Register
                  </Heading>
                  <Input
                    name="username"
                    value={player.username}
                    type="text"
                    placeholder="username"
                    h="50px"
                    pl="30px"
                    bgColor="#E8E0FF"
                    borderRadius="xl"
                    border="transparent"
                    onChange={handleChange}
                    required
                  />
                  <Input
                    value={player.email}
                    name="email"
                    placeholder="email"
                    type="email"
                    h="50px"
                    pl="30px"
                    bgColor="#E8E0FF"
                    borderRadius="xl"
                    border="transparent"
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="password"
                    value={player.password}
                    type="password"
                    placeholder="password"
                    h="50px"
                    pl="30px"
                    bgColor="#E8E0FF"
                    borderRadius="xl"
                    border="transparent"
                    onChange={handleChange}
                    required
                  />
                  <Checkbox pb="20px">
                    <Text fontSize={['xs', 'md']}>
                      I Agree to the <b>Term</b> and <b>Privacy Policy</b>{' '}
                    </Text>
                  </Checkbox>
                </VStack>
                <VStack justifyContent="center" rowGap="10px">
                  <Button
                    w="100%"
                    h="50px"
                    bgColor="#B10BFF"
                    color="white"
                    fontSize="sm"
                    type="submit"
                    borderRadius="20px"
                  >
                    Register
                  </Button>
                </VStack>
              </form>
            </Box>
            <Box w={['100%', '100%', '100%', '30%']} alignItems="baseline">
              <Text
                color={[
                  'blackAlpha.800',
                  'blackAlpha.800',
                  'blackAlpha.800',
                  '#EEF2FE',
                ]}
                textAlign={['center', 'center', 'center', 'end']}
                fontWeight="bold"
                fontStyle="italic"
                letterSpacing="0.1rem"
                fontSize={['sm', 'md', 'lg', '46px']}
                mb={[4, 0, 0, 0]}
                mt={[4, 0, 0]}
              >
                Welcome to our Community
              </Text>

              <Text
                textAlign={['center', 'center', 'center', 'end']}
                color="#1A202C"
                dropShadow="dark-lg"
                fontSize={['xs', 'sm']}
                mt={['', '30px']}
                mb={4}
                textShadow="2px 1px 10px white"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis quod nam ut, quia optio iure minima atque. Atque, fuga
                suscipit.
              </Text>
            </Box>
          </Flex>
        </HStack>
      </Flex>
      <LoginRegisterFooter />
    </Box>
  );
}

export default Register;
