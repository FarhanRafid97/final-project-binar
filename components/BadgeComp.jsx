import React from "react";
import { Badge } from "@chakra-ui/react";
import { GiAchievement, GiLaurelsTrophy, GiTrophy } from "react-icons/gi";
import { CgTrophy } from "react-icons/cg";

import { FaRegSadCry } from "react-icons/fa";

const BadgeComp = ({ score }) => {
  const Achivement = () => {
    if (score >= 500 && score <= 700) {
      return (
        <Badge maxW="200px" borderRadius="full" display="flex" alignItems="center" px="2" ml="2" colorScheme="gray">
          <GiAchievement />
          &nbsp; {score}
        </Badge>
      );
    } else if (score >= 700 && score <= 1000) {
      return (
        <Badge borderRadius="full" display="flex" alignItems="center" px="2" ml="2" h="25px" colorScheme="pink">
          <CgTrophy /> &nbsp; {score}
        </Badge>
      );
    } else if (score >= 1000 && score <= 2000) {
      return (
        <Badge borderRadius="full" display="flex" alignItems="center" px="3" ml="2" justifyContent="space-between" m="auto" maxW="80px" h="25px" colorScheme="red">
          <GiLaurelsTrophy /> &nbsp; {score}
        </Badge>
      );
    } else if (score > 2000) {
      return (
        <Badge borderRadius="full" display="flex" alignItems="center" px="3" ml="2" justifyContent="space-between" m="auto" maxW="80px" h="25px" colorScheme="blue">
          <GiTrophy /> &nbsp; {score}
        </Badge>
      );
    } else {
      return (
        <Badge borderRadius="full" display="flex" alignItems="center" px="3" ml="2" justifyContent="space-between" m="auto" maxW="80px" h="25px" colorScheme="green">
          <FaRegSadCry /> &nbsp; {score}
        </Badge>
      );
    }
  };
  return <Achivement />;
};

export default BadgeComp;
