import {
  Button,
  Heading,
  Input,
  Link,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import { unstable_getServerSession } from 'next-auth';
import Head from 'next/head';
import React, { useState } from 'react';
import { baseUrl } from '../axios/api';
import Layout from '../components/Layout';
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
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [linkForgot, setLinkForgot] = useState('');
  const toast = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${baseUrl}/api/v1/auth/forgot-password`,
        { email }
      );
      if (data) {
        setLoading(false);
        setLinkForgot(data.link);
      }
    } catch (error) {
      setLoading(false);
      toast({
        id: toast,
        title: 'Failed Create Account',
        description: error.response.data.msg,
        position: 'top',
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      return;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Forgot Password - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <VStack rowGap="15px" color="white" m="auto" w="600px" p={8}>
        <Heading>Forgot Password</Heading>
        <form onSubmit={onSubmit}>
          <VStack w="450px" rowGap="15px">
            <Input
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              w="200px"
              type="submit"
              isLoading={loading}
              colorScheme="messenger"
            >
              Submit
            </Button>
          </VStack>
        </form>
        {linkForgot && (
          <Link href={linkForgot} target="_blank">
            Change Your Password
          </Link>
        )}
      </VStack>
    </Layout>
  );
};

export default ForgotPassword;
