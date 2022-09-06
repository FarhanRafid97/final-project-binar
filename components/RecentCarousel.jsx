import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';
import Rating from './Rating';

const RecentCarousel = ({ recentGame }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {recentGame
        .map((data) => (
          <Box key={data?.id}>
            <Link href={`/game/${data?.id}`} passHref>
              <VStack
                as="a"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                borderRadius="10px"
                _hover={{
                  bgColor: '#4c4c4c',
                }}
              >
                <Flex mt="20px" justifyContent="center">
                  <Box
                    _hover={{
                      transform: 'scale(1.1)',
                      transition: 'transform 0.7s',
                      bgColor: '#4c4c4c',
                    }}
                    mt="20px"
                    w={['110px', '180px']}
                    h={['110px', '200px']}
                    bgImg={data.thumbnail}
                    bgSize="cover"
                    bgPosition="center"
                    borderRadius="7px"
                    justifyContent="center"
                  />
                </Flex>
                <Text color="white">{data?.name}</Text>
                <Box color="white">
                  <Rating rate={data.rating} />
                </Box>
              </VStack>
            </Link>
          </Box>
        ))
        .reverse()}
    </Slider>
  );
};

export default RecentCarousel;
