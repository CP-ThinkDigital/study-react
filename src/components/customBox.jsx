import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

export default function CustomBox(props) {
  const bg = useColorModeValue("white", "gray.900");
  const color = useColorModeValue("gray.900", "gray.200");

  return (
    <Box
      mb={5}
      borderWidth="1px"
      borderRadius="lg"
      p={3}
      bg={bg}
      color={color}
      {...props}
    >
      {props.children}
    </Box>
  );
}
