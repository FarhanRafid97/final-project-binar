import {
  Avatar,
  Box,
  Flex,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { FaCrown, FaMedal } from 'react-icons/fa';
import { GiRibbonMedal } from 'react-icons/gi';
import { baseUrl } from '../axios/api';
import Layout from '../components/Layout';

export async function getServerSideProps() {
  const { data: leaderboard } = await axios.get(
    `${baseUrl}/api/v1/user/leaderboard`
  );
  return {
    props: { leaderboard }, // will be passed to the page component as props
  };
}

const Leaderboard = ({ leaderboard }) => {
  return (
    <Layout>
      <Box
        w={['95%', '80%', '80%', '80%']}
        mx="auto"
        minH="100vh"
        p={['0', '40px']}
      >
        <VStack rowGap={12}>
          <Heading color="gray.300" mx="auto" textAlign="center">
            Top 10 Leaderboard
          </Heading>
          <Box w={['100%', '100%', '100%', '60%']}>
            <TableContainer>
              <Table variant="striped" colorScheme="whiteAlpha">
                <TableCaption color="white">Top Player This Month</TableCaption>
                <Thead>
                  <Tr color="gray.300">
                    <Th color="gray.300" w="50px">
                      No
                    </Th>
                    <Th color="gray.300">Player</Th>
                    <Th color="gray.300" isNumeric>
                      Score
                    </Th>
                  </Tr>
                </Thead>

                <Tbody textAlign="center">
                  {leaderboard.map((data, index) => (
                    <Tr key={data.username}>
                      <Td color="gray.300">{index + 1}</Td>
                      <Td>
                        <Flex
                          alignItems="center"
                          columnGap="15px"
                          color="gray.300"
                        >
                          <Avatar
                            name={data.username}
                            src={
                              data?.pict
                                ? data?.pict
                                : 'https://media.istockphoto.com/vectors/male-profile-flat-blue-simple-icon-with-long-shadow-vector-id522855255?b=1&k=20&m=522855255&s=612x612&w=0&h=hU2lBVV4_3z5K3V-KhnoAausfOx8zcHAgHkHz6sB3Jk='
                            }
                          />
                          <Text>{data?.username}</Text>
                          {index === 0 && <FaCrown />}
                          {index === 1 && <FaMedal />}
                          {index === 2 && <GiRibbonMedal />}
                        </Flex>
                      </Td>
                      <Td isNumeric color="gray.300">
                        {data.point}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Leaderboard;
