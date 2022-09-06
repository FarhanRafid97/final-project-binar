import { Flex, Link } from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';

const LoginRegisterHeader = () => {
  return (
    <Flex position="relative">
      <Flex
        position="absolute"
        w="100%"
        pr={['40px', '40px', '165px']}
        pt={['5px', '5px', '35px']}
        justifyContent="flex-end"
        zIndex="99"
        fontSize="16px"
        right="0"
        top="0"
      >
        <NextLink href="/login" passHref>
          <Link
            _hover={{
              borderBottom: '3px solid black',
              padding: ['5px 3px', '10px 3px'],
              fontWeight: '500',
            }}
            p={['5px 3px', '10px 3px']}
            mr={['25px', '64px']}
            _activeLink={{
              borderBottom: '3px solid black',
              padding: ['5px 3px', '10px 3px'],
              fontWeight: '500',
            }}
          >
            Sign In
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link
            _hover={{
              borderBottom: '3px solid black',
              padding: ['5px', '10px 3px'],
              fontWeight: '500',
            }}
            p={['5px', '10px 3px']}
            _activeLink={{
              borderBottom: '3px solid black',
              padding: ['5px', '10px 3px'],
              fontWeight: '500',
            }}
          >
            Register
          </Link>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default LoginRegisterHeader;
