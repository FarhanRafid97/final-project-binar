import React from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import Slider from "react-slick";
import Link from "next/link";
import Rating from "./Rating";

const MiniCarousel = ({ catGames }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 6000,
    cssEase: "linear",
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <Box>
      <Slider {...settings}>
        {catGames?.results.map((data) => (
          <Box key={data?.id}>
            <Link href={`/game/${data?.id}`} passHref>
              <VStack
                as="a"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                borderRadius="10px"
                _hover={{
                  bgColor: "#4c4c4c",
                }}
              >
                <Flex mt="20px" justifyContent="center">
                  <Box
                    _hover={{
                      transform: "scale(1.1)",
                      transition: "transform 0.7s",
                      bgColor: "#4c4c4c",
                    }}
                    mt="20px"
                    w={["110px", "140px"]}
                    h={["110px", "200px"]}
                    bgImg={data.background_image}
                    bgSize="cover"
                    bgPosition="center"
                    borderRadius="7px"
                    justifyContent="center"
                  />
                </Flex>
                <Text noOfLines={2} color="white">
                  {data?.name}
                </Text>
                <Box color="white">
                  <Rating rate={data.rating} />
                </Box>
              </VStack>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default MiniCarousel;
