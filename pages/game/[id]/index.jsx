import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import VideoPlayer from '../../../components/VideoTrailer';
import {
  addFavoriteGame,
  favoriteSelector,
} from '../../../store/slices/favoriteGame';
import { addPlayedGame } from '../../../store/slices/playedGame';

const GameDetails = ({ data, gameTrailer }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { favorite } = useSelector(favoriteSelector);
  const isFavorited = favorite.filter((fav) => fav.id === data.id);

  return (
    <Flex>
      <Head>
        <title> {data.name} - UnGames </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NextLink href="/dashboard">
        <Link
          position="absolute"
          zIndex="299"
          top={['0', '20px']}
          padding="10px 10px"
          borderRadius="5px"
          bg="gray.200"
          _hover={{ textDecor: 'none' }}
          left={['0', '20px']}
        >
          <AiOutlineHome />
        </Link>
      </NextLink>
      <Flex
        bgSize="cover"
        bgRepeat="no-repeat"
        bgImage={data.background_image}
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100vh"
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          p={['20px', '20px']}
          width={['90%', '1000px']}
          height={['90%', '65%']}
          bgColor="rgba(0, 0, 0, 0.40)"
          borderRadius="40px"
          position="absolute"
        >
          <Flex
            direction={['column', 'row']}
            gap="10px"
            right={['0px', '80px']}
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Box
              boxShadow="dark-lg"
              p="3"
              rounded="md"
              w={['300px', '450px']}
              mr={['0px', '50px']}
            >
              <VideoPlayer vidTrailer={gameTrailer} noVideo={data} />
            </Box>
            <Box w={['300px', '500px']}>
              <Heading
                textAlign="start"
                as="h1"
                fontSize={['2xl', '4xl']}
                color="white"
                mb={['15px', '20px']}
              >
                {data.name}
              </Heading>
              <Box fontSize="md" color="white" textAlign="justify">
                <table>
                  <tbody>
                    <tr>
                      <th>Category </th>
                      <td>: {data.genres[0]?.name}</td>
                    </tr>

                    <tr>
                      <th>ESB Rating </th>
                      <td>: {data.esrb_rating?.name}</td>
                    </tr>
                  </tbody>
                </table>

                <Text mt="5px" fontSize={['xl', 'xl']}>
                  Description :
                </Text>
                <Text fontSize="md" noOfLines={[4, 5]}>
                  {data.description_raw}
                </Text>
                <Flex justifyContent="space-around">
                  <Button
                    w={['120px', '200px']}
                    h={['40px', '50px']}
                    colorScheme="teal"
                    borderRadius="40px"
                    mr="30px"
                    fontSize="sm"
                    mt="20px"
                    onClick={() => {
                      dispatch(
                        addPlayedGame({
                          id: data.id,
                          name: data.name,
                          thumbnail: data.background_image,
                          rating: data.rating,
                        })
                      );
                      toast({
                        description: 'Thank You For Playing',
                        position: 'top-right',
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    Play Now
                  </Button>
                  <Button
                    w={['120px', '200px']}
                    h={['40px', '50px']}
                    colorScheme="teal"
                    borderRadius="40px"
                    fontSize="sm"
                    mt="20px"
                    disabled={isFavorited.length !== 0}
                    onClick={() => {
                      dispatch(
                        addFavoriteGame({
                          id: data.id,
                          title: data.name,
                          thumbnail: data.background_image,
                          rating: data.rating,
                        })
                      );
                      toast({
                        description: 'Add Game To Favorite',
                        position: 'top-right',
                        status: 'info',
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    <Text mr="4px">Favorite</Text>
                    <MdOutlineFavoriteBorder />
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>

          {/* <HStack p="50px" position="absolute" justifyContent={["center", "center"]} alignItems="center" w={["90%", "100%"]} right={["", ""]} flexWrap="wrap">
              <Box bgColor="black" width={["300px", "500px"]} border="1px solid black">
                <VideoPlayer vidTrailer={gameTrailer} noVideo={data} />
              </Box>
              <Box w={["100", "30%"]} mt="40px">
                <Heading textAlign="start" as="h1" fontSize={["2xl", "4xl"]} color="white" mb={["15px", "40px"]}>
                  {data.name}
                </Heading>

                <Box fontSize="md" color="white" textAlign="justify">
                  <table>
                    <tbody>
                      <tr>
                        <th>Category </th>
                        <td>: {data.genres[0]?.name}</td>
                      </tr>

                      <tr>
                        <th>ESB Rating </th>
                        <td>: {data.esrb_rating?.name}</td>
                      </tr>
                    </tbody>
                  </table>

                  <Text mt="5px" fontSize={["xl", "xl"]}>
                    Description :
                  </Text>
                  <Text fontSize="md" noOfLines={[4, 5]}>
                    {data.description_raw}
                  </Text>
                </Box>
                <Flex justifyContent="space-around">
                  <Button
                    w={["120px", "200px"]}
                    h={["40px", "50px"]}
                    colorScheme="teal"
                    borderRadius="40px"
                    mr="30px"
                    fontSize="sm"
                    mt="20px"
                    onClick={() => {
                      dispatch(
                        addPlayedGame({
                          id: data.id,
                          name: data.name,
                          thumbnail: data.background_image,
                          rating: data.rating,
                        })
                      );
                      toast({
                        description: "Thank You For Playing",
                        position: "top-right",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    Play Now
                  </Button>
                  <Button
                    w={["120px", "200px"]}
                    h={["40px", "50px"]}
                    colorScheme="teal"
                    borderRadius="40px"
                    fontSize="sm"
                    mt="20px"
                    disabled={isFavorited.length !== 0}
                    onClick={() => {
                      dispatch(
                        addFavoriteGame({
                          id: data.id,
                          title: data.name,
                          thumbnail: data.background_image,
                          rating: data.rating,
                        })
                      );
                      toast({
                        description: "Add Game To Favorite",
                        position: "bottom",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                      });
                    }}
                  >
                    <Text mr="4px">Favorite</Text>
                    <MdOutlineFavoriteBorder />
                  </Button>
                </Flex>
              </Box>
            </HStack> */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  const { data } = await axios.get(
    `https://api.rawg.io/api/games/${params.id}?key=6d425f0f68c54e1b81e2f433d5b09e67`
  );
  const { data: gameTrailer } = await axios.get(
    `https://api.rawg.io/api/games/${params.id}/movies?key=6d425f0f68c54e1b81e2f433d5b09e67`
  );

  return {
    props: { data, gameTrailer },
  };
}

export default GameDetails;
