import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Layout from '../components/Layout';
import OurTeamCarousel from '../components/OurTeamCarousel';

function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Box bgColor="#242424">
          <Flex
            bgImg="/assets/bg-login.png"
            justifyContent="center"
            alignItems="center"
            bgSize="20%"
            bgPosition="bottom left"
            bgRepeat="no-repeat"
            textAlign="center"
            fontSize="xl"
          >
            <Box
              color="white"
              w={['90%', '90%', '90%', '70%']}
              padding={['40px', '80px']}
              borderRadius="40px"
            >
              <Heading
                color="white"
                mb="40px"
                as="h1"
                fontSize={['3xl', '5xl']}
              >
                About Us
              </Heading>
              <Text mb="30px" textAlign="justify">
                {` The Undefined Team is a group of people who enjoy Coding and
                Gaming. We are comprised of players with different levels of
                skills and expertise in many diverse genres; including FPS, MMO,
                MOBAs, RPG, Strategy, etc... The name comes from the feeling
                that we may not have the most definitive answer as "definitive"
                can be subjective. But we try to figure out what each game
                requires and give understanding and guidance to those in need.
                From our experiences; it's not just one genre that can be tough
                - but many.It all started when I was tasked with teaching my son
                how to play games on his PC.`}
              </Text>
              <Heading
                color="white"
                mb="40px"
                as="h1"
                fontSize={['3xl', '3xl']}
              >
                Our Team
              </Heading>

              <OurTeamCarousel />
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}

export default AboutUs;
