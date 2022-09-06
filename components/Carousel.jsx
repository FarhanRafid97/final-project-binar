import React from "react";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import Slider from "react-slick";
import NextLink from "next/link";

const Carousel = ({ pinnedGames }) => {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Slider {...settings}>
        <Box
          position="relative"
          w={["600px", "800px"]}
          h={["300px", "600px"]}
          borderRadius="40px"
          bgSize="cover"
          boxShadow="0 0 200px rgba(0,0,0,0.9) inset"
          bgImage={pinnedGames[0]?.background_image}
        >
          <Flex>
            <Button
              w={["100px", "170px"]}
              h={["30px", "40px"]}
              position="absolute"
              bottom={["15px", "40px"]}
              right={["15px", "100px"]}
              bgColor="#B10BFF"
              color="white"
              borderRadius="40px"
              fontSize="sm"
              zIndex="99"
            >
              <NextLink href="/game/1">
                <a>Play Now</a>
              </NextLink>
            </Button>
            <Text w={["150px", "150px", "50%", "100%"]} position="absolute" bottom={["15px", "40px"]} left={["15px", "50px"]} color="white" fontSize={["2xl", "4xl"]}>
              {pinnedGames[0]?.name}
            </Text>
          </Flex>
        </Box>
        <Box
          position="relative"
          w={["600px", "800px"]}
          h={["300px", "600px"]}
          borderRadius="40px"
          bgSize="cover"
          boxShadow="0 0 200px rgba(0,0,0,0.9) inset"
          bgImage={pinnedGames[1]?.background_image}
        >
          <Flex>
            <Button
              w={["100px", "170px"]}
              h={["30px", "40px"]}
              position="absolute"
              bottom={["15px", "40px"]}
              right={["15px", "100px"]}
              bgColor="#B10BFF"
              color="white"
              borderRadius="40px"
              fontSize="sm"
              zIndex="99"
            >
              <NextLink href="/game/1">
                <a>Play Now</a>
              </NextLink>
            </Button>
            <Text w={["150px", "150px", "50%", "100%"]} position="absolute" bottom={["15px", "40px"]} left={["15px", "50px"]} color="white" fontSize={["2xl", "4xl"]}>
              {pinnedGames[1]?.name}
            </Text>
          </Flex>
        </Box>
        <Box
          position="relative"
          w={["600px", "800px"]}
          h={["300px", "600px"]}
          borderRadius="40px"
          bgSize="cover"
          boxShadow="0 0 200px rgba(0,0,0,0.9) inset"
          bgImage={pinnedGames[2]?.background_image}
        >
          <Flex>
            <Button
              w={["100px", "170px"]}
              h={["30px", "40px"]}
              position="absolute"
              bottom={["15px", "40px"]}
              right={["15px", "100px"]}
              bgColor="#B10BFF"
              color="white"
              borderRadius="40px"
              fontSize="sm"
              zIndex="99"
            >
              <NextLink href="/game/1">
                <a>Play Now</a>
              </NextLink>
            </Button>
            <Text w={["150px", "150px", "50%", "100%"]} position="absolute" bottom={["15px", "40px"]} left={["15px", "50px"]} color="white" fontSize={["2xl", "4xl"]}>
              {pinnedGames[2]?.name}
            </Text>
          </Flex>
        </Box>
      </Slider>
    </div>
  );
};

export default Carousel;
