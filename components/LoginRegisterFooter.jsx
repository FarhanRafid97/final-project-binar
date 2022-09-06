import { Flex, Link } from '@chakra-ui/react';
import React from 'react';

const LoginRegisterFooter = () => {
  return (
    <Flex
      display={['none', 'flex']}
      position="relative"
      bottom="72px"
      maxHeight="100vh"
    >
      <Flex position="absolute" left="250px">
        <Link
          href={'/disclaimer'}
          _hover={{
            borderBottom: '3px solid black',
            padding: '10px 3px',
            fontWeight: 'bold',
          }}
          p="10px 3px"
          fontWeight="bold"
          mr="75px"
          color="#959BAA"
        >
          Disclaimer
        </Link>
        <Link
          href={'/privacy-policy'}
          _hover={{
            borderBottom: '3px solid black',
            padding: '10px 3px',
            fontWeight: 'bold',
          }}
          p="10px 3px"
          fontWeight="bold"
          color="#959BAA"
        >
          Privacy Policy
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginRegisterFooter;
