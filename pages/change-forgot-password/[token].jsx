import {
  Button,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { baseUrl } from '../../axios/api';
const ChangePassword = () => {
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/v1/auth/change-forgot-password/${token}`,
        { password },
        { headers: { Authorization: token } }
      );

      setLoading(false);
      toast({
        title: 'Failed Create Account',
        description: data.msg,
        position: 'top',
        status: 'success',
        duration: 7000,
        isClosable: true,
      });
    } catch (error) {
      setLoading(false);
      toast({
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
        <title>Change Password - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <VStack rowGap="15px" color="white" m="auto" w="600px" p={8}>
        <Heading>Change Password</Heading>
        <form onSubmit={onSubmit}>
          <VStack w="450px" rowGap="15px">
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              name="confirmPassowrd"
              type="password"
              placeholder="Confirm Passowrd"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              required
            />
            {confPassword === password && password.length >= 4 && (
              <Button
                w="200px"
                type="submit"
                isLoading={loading}
                colorScheme="messenger"
                _disabled={confPassword === password && password.length >= 4}
              >
                Submit
              </Button>
            )}
          </VStack>
        </form>

        {password.length < 4 && (
          <Text color="red">Password At least 4 Character </Text>
        )}
        {confPassword !== password && confPassword.length > 4 && (
          <Text color="red">Password Didnt Match</Text>
        )}
      </VStack>
    </Layout>
  );
};

export default ChangePassword;
