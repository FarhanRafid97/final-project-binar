import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Img,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { API_AUTH } from '../../axios/api';
import ModalComponent from '../../components/ModalRule';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth';
import { authSelector, setUserData } from '../../store/slices/auth';

const GamePrs = () => {
  const { data: session } = useSession();
  const { user } = useSelector(authSelector);
  const SELECT_ROCK = 'rock';
  const SELECT_PAPER = 'paper';
  const SELECT_SCISSORS = 'scissors';
  const [userSelect, setUserSelect] = useState('s');
  const [compSelect, setCompSelect] = useState('');
  const [condition, setCondition] = useState('VS');
  const [isChose, setIsChose] = useState(false);
  const [score, setScore] = useState({ comp: 0, player: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [finalResult, setFinalResult] = useState('');
  const dispatch = useDispatch();

  const resetGame = () => {
    setCompSelect('');
    setUserSelect('');
    setCondition('VS');
    setIsChose(false);
  };

  useEffect(() => {
    let ignore = false;
    const getUser = async () => {
      if (session) {
        const { data } = await API_AUTH(session?.user?.accessToken).get(
          '/user/myBio'
        );
        if (ignore) {
          return;
        }
        dispatch(setUserData(data));
      }
      return;
    };
    getUser();
    return () => (ignore = true);
  }, [session, dispatch]);

  const selectPrs = async (chose) => {
    if (isChose) {
      return;
    } else {
    }
    setCondition('Wait for Enemy Choose');
    setIsChose(true);

    let compChose;

    setTimeout(() => {
      const angkaRandom = Math.floor(Math.random() * 3 + 1);
      setUserSelect(chose);
      if (angkaRandom === 1) {
        compChose = SELECT_SCISSORS;
        setCompSelect(SELECT_SCISSORS);
      } else if (angkaRandom === 2) {
        compChose = SELECT_ROCK;
        setCompSelect(SELECT_ROCK);
      } else if (angkaRandom === 3) {
        compChose = SELECT_PAPER;
        setCompSelect(SELECT_PAPER);
      }
    }, 1000);

    let scorePlayer = 0;
    let scoreComp = 0;

    setTimeout(() => {
      if (chose === compChose) {
        setCondition('draw');
      } else if (chose === SELECT_ROCK) {
        if (compChose === SELECT_PAPER) {
          scoreComp += 1;
          setCondition('You Lose');
          setScore({ ...score, comp: score.comp + 1 });
        } else {
          setCondition('You Win');
          scorePlayer += 1;
          setScore({ ...score, player: score.player + 1 });
        }
      } else if (chose === SELECT_SCISSORS) {
        if (compChose === SELECT_ROCK) {
          setCondition('You Lose');
          scoreComp += 1;
          setScore({ ...score, comp: score.comp + 1 });
        } else {
          setCondition('You Win');
          scorePlayer += 1;
          setScore({ ...score, player: score.player + 1 });
        }
      } else if (chose === SELECT_PAPER) {
        if (compChose === SELECT_SCISSORS) {
          setCondition('You Lose');
          scoreComp += 1;
          setScore({ ...score, comp: score.comp + 1 });
        } else {
          setCondition('You Win');
          scorePlayer += 1;
          setScore({ ...score, player: score.player + 1 });
        }
      }

      setTimeout(async () => {
        if (scorePlayer === 1) {
          const { data } = await API_AUTH(session?.user?.accessToken).put(
            '/user/update/score',
            {
              totalScore: 100,
            }
          );
          dispatch(setUserData(data));

          setGameOver(true);
          setFinalResult('You Win The Game');
        } else if (scoreComp === 1) {
          setGameOver(true);
          setFinalResult('You Lose The Game');
        }
        resetGame();
      }, 1000);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Papper Rock Scissor - UnGames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        display={gameOver ? 'flex ' : 'none'}
        width="100%"
        h="100vh"
        position="fixed"
        zIndex="99"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          w="300px"
          bgColor="#242424"
          borderRadius="30px"
          p="40px"
          border="1px solid black"
          textAlign="center"
        >
          <Heading
            color={finalResult === 'You Win The Game' ? 'green.400' : 'red.500'}
          >
            {finalResult}
          </Heading>
          <Button
            onClick={() => {
              resetGame();
              setScore({ comp: 0, player: 0 });
              setGameOver(false);
            }}
          >
            Play Again
          </Button>
        </VStack>
      </Flex>
      <Flex
        h="100vh"
        justifyContent="center"
        alignItems="center"
        backgroundImage="https://t3.ftcdn.net/jpg/01/89/45/58/360_F_189455818_aBZgOqIa5ahNJQg1udtrGiANlIXk1twR.jpg"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
      >
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
        <Box
          position="absolute"
          zIndex="299"
          top={['0', '20px']}
          right={['0', '20px']}
        >
          <ModalComponent />
        </Box>
        <Box w={['95%', '470px', '730px', '900px']} h="95%">
          <VStack
            boxShadow="xl"
            justifyContent="space-between"
            h="100%"
            borderRadius="55px"
            bg="blackAlpha.400"
            backdropFilter="blur( 11px )"
          >
            <Flex
              flex="1"
              w="100%"
              pt={['20px', '10px']}
              justifyContent="center"
              alignItems="start"
              position="relative"
            >
              <Img
                src="/assets/games/ai.png"
                position="absolute"
                bottom="10px"
                zIndex="99"
                w={['90px', '100px', '140px', '120px']}
                left={['10px', '20px']}
              />
              <VStack
                position="absolute"
                bottom="10px"
                right={['30px', '60px']}
                fontSize={['20px', '25px', '35px']}
              >
                <Text>Comp</Text>
                <Text>{score.comp}</Text>
              </VStack>
              <HStack
                alignItems="start"
                columnGap="25px"
                justifyContent="center"
                position="relative"
                h="100%"
              >
                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    border="7px solid #9d0208"
                    borderRadius="50%"
                    padding={['15px', '15px', '30px']}
                    bg="whiteAlpha.600"
                    justifyContent="center"
                    position={
                      compSelect === SELECT_ROCK ? 'absolute' : 'relative'
                    }
                    top={compSelect === SELECT_ROCK ? '53%' : '0'}
                    left={compSelect === SELECT_ROCK ? '35%' : '0'}
                    transition="1s"
                  >
                    <Image
                      src={
                        compSelect === SELECT_ROCK
                          ? '/assets/games/rock2.png'
                          : '/assets/games/questionMark2.png'
                      }
                      width={compSelect === SELECT_ROCK ? 60 : 35}
                      height={60}
                      alt="computer-rock-png"
                    />
                  </Flex>
                </Box>

                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    justifyContent="center"
                    padding={['15px', '15px', '30px']}
                    border="7px solid #9d0208"
                    borderRadius="50%"
                    position={
                      compSelect === SELECT_PAPER ? 'absolute' : 'relative'
                    }
                    top={compSelect === SELECT_PAPER ? '53%' : '0px'}
                    bg="whiteAlpha.600"
                    transition="1s"
                  >
                    <Image
                      src={
                        compSelect === SELECT_PAPER
                          ? '/assets/games/paper2.png'
                          : '/assets/games/questionMark2.png'
                      }
                      width={compSelect === SELECT_PAPER ? 60 : 35}
                      height={60}
                      alt="computer-papper-png"
                    />
                  </Flex>
                </Box>
                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    padding={['15px', '15px', '30px']}
                    border="7px solid #9d0208"
                    borderRadius="50%"
                    justifyContent="center"
                    _hover={{ transition: '1s' }}
                    position={
                      compSelect === SELECT_SCISSORS ? 'absolute' : 'relative'
                    }
                    top={compSelect === SELECT_SCISSORS ? '53%' : '0%'}
                    right={compSelect === SELECT_SCISSORS ? '35%' : '0px'}
                    bg="whiteAlpha.600"
                    transition="1s"
                  >
                    <Image
                      src={
                        compSelect === SELECT_SCISSORS
                          ? '/assets/games/scissors.png'
                          : '/assets/games/questionMark2.png'
                      }
                      width={compSelect === SELECT_SCISSORS ? 60 : 35}
                      height={60}
                      alt="computer-scissors-png"
                    />
                  </Flex>
                </Box>
              </HStack>
            </Flex>
            <Flex
              w="100%"
              overflow="hidden"
              alignItems="center"
              justifyContent="center"
              bg="whiteAlpha.600"
            >
              <Heading transition="1.5s" color="white" size={['md', 'xl']}>
                {condition}
              </Heading>
            </Flex>
            <Flex
              flex="1"
              w="100%"
              pb={['20px', '10px']}
              justifyContent="center"
              alignItems="end"
              position="relative"
            >
              <Img
                src={
                  user?.biodata?.profilePict
                    ? user?.biodata?.profilePict
                    : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'
                }
                position="absolute"
                bottom="130px"
                top={['10px', undefined]}
                right={['20px', '40px']}
                zIndex="99"
                w={['70px', '70px', '100px']}
                borderRadius="50%"
              />
              <VStack
                position="absolute"
                bottom={[undefined, '120px']}
                top={['10px', undefined]}
                left={['20px', '40px']}
                fontSize={['20px', '25px', '35px']}
                columnGap="5px"
              >
                <Text>{user?.username}</Text>
                <Text>{score.player}</Text>
              </VStack>
              <HStack
                columnGap="25px"
                position="relative"
                h="100%"
                justifyContent="start"
                alignItems="end"
              >
                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    border="7px solid #74c69d"
                    borderRadius="50%"
                    padding={['15px', '15px', '30px']}
                    cursor="pointer"
                    justifyContent="center"
                    bg={
                      userSelect === SELECT_ROCK
                        ? 'green.400'
                        : 'whiteAlpha.600'
                    }
                    position={
                      userSelect === SELECT_ROCK ? 'absolute' : 'relative'
                    }
                    bottom={userSelect === SELECT_ROCK ? '53%' : '0'}
                    left={userSelect === SELECT_ROCK ? '35%' : '0%'}
                    transition="1s"
                    _hover={{
                      transition: '1s',
                      bg: 'green.400',
                      rotateY: '55deg',
                    }}
                    onClick={() => selectPrs(SELECT_ROCK)}
                  >
                    <Image
                      src="/assets/games/rock2.png"
                      width={60}
                      height={60}
                      alt="user-rock-png"
                    />
                  </Flex>
                </Box>

                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    justifyContent="center"
                    borderRadius="50%"
                    border="7px solid #74c69d"
                    padding={['15px', '15px', '30px']}
                    cursor="pointer"
                    position={
                      userSelect === SELECT_PAPER ? 'absolute' : 'relative'
                    }
                    bottom={userSelect === SELECT_PAPER ? '53%' : '0%'}
                    _hover={{
                      transition: '1s',
                      bg: 'green.600',
                      rotateY: '55deg',
                    }}
                    transition="1s"
                    onClick={() => selectPrs(SELECT_PAPER)}
                    bg={
                      userSelect === SELECT_PAPER
                        ? 'green.400'
                        : 'whiteAlpha.600'
                    }
                  >
                    <Image
                      src="/assets/games/paper2.png"
                      width={60}
                      height={60}
                      alt="user-paper-png"
                    />
                  </Flex>
                </Box>
                <Box w={['70px', '90px', '150px']}>
                  <Flex
                    w={['70px', '90px', '150px']}
                    justifyContent="center"
                    padding={['15px', '15px', '30px']}
                    border="7px solid #74c69d"
                    borderRadius="50%"
                    transition="1s"
                    cursor="pointer"
                    position={
                      userSelect === SELECT_SCISSORS ? 'absolute' : 'relative'
                    }
                    bottom={userSelect === SELECT_SCISSORS ? '53%' : '0%'}
                    right={userSelect === SELECT_SCISSORS ? '35%' : '0%'}
                    _hover={{
                      transition: '1s',
                      bg: 'green.400',
                      rotateY: '55deg',
                    }}
                    onClick={() => selectPrs(SELECT_SCISSORS)}
                    bg={
                      userSelect === SELECT_SCISSORS
                        ? 'green.400'
                        : 'whiteAlpha.600'
                    }
                  >
                    <Image
                      src="/assets/games/scissors.png"
                      width={60}
                      height={60}
                      alt="computer-scissors-png"
                    />
                  </Flex>
                </Box>
              </HStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

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

export default GamePrs;
