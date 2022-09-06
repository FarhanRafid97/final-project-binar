import React from 'react';
import { Text } from '@chakra-ui/layout';
const FavoriteRating = ({ rate }) => {
  const Rating = () => {
    if (rate > 0 && rate < 1) {
      return <Text> No Ratings </Text>;
    } else if (rate > 1 && rate < 2) {
      return <Text>⭐</Text>;
    } else if (rate > 2 && rate < 3) {
      return <Text>⭐⭐</Text>;
    } else if (rate > 3 && rate < 4) {
      return <Text>⭐⭐⭐</Text>;
    } else if (rate > 4 && rate < 5) {
      return <Text>⭐⭐⭐⭐</Text>;
    } else if (rate > 5 === rate) {
      return <Text>⭐⭐⭐⭐⭐</Text>;
    } else {
      return <Text>No Ratings</Text>;
    }
  };
  return <Rating />;
};

export default FavoriteRating;
