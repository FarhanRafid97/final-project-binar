import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const NotFoundPage = () => {
  return (
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
              h={['150px', '100%']}
              src="/assets/banner-homepage.png"
              alt="banner-hompage-undefined"
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
              <Text fontSize="2xl" color="white"></Text>
              <Box
                display="flex"
                position="relative"
                bottom={['40px', '50px']}
              ></Box>
            </Flex>
          </Box>
        </VStack>

        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          w={['90%', '90%', '80%', '60%']}
          h="300px"
          gap="30px"
          borderRadius="40px"
          bgColor="rgba(64, 64, 64, 0.9)"
          backdropFilter="blur( 11px )"
          padding="50px"
          color="white"
        >
          <Text fontSize="3xl" fontWeight="700" color="yellow">
            User Not Found
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
