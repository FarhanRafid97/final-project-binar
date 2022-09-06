import React from "react";
import { Text } from "@chakra-ui/layout";
const Rating = ({ rate }) => {
  const Rating = () => {
    if (rate > 0 && rate < 1) {
      return <Text> No Ratings </Text>;
    } else if (rate >= 1 && rate <= 1.9) {
      return (
        <Text>
          ⭐ <br /> {rate}
        </Text>
      );
    } else if (rate >= 2 && rate <= 2.9) {
      return (
        <Text>
          {"⭐".repeat(2)} <br /> {rate}
        </Text>
      );
    } else if (rate >= 3 && rate <= 3.9) {
      return (
        <Text>
          {"⭐".repeat(3)} <br /> {rate}
        </Text>
      );
    } else if (rate >= 4 && rate <= 4.9) {
      return (
        <Text>
          {"⭐".repeat(4)} <br /> {rate}
        </Text>
      );
    } else if (rate >= 5) {
      return (
        <Text>
          {"⭐".repeat(5)} <br /> {rate}
        </Text>
      );
    } else {
      return <Text>No Ratings</Text>;
    }
  };
  return <Rating />;
};

export default Rating;
