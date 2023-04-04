import React from "react";
import { Link } from "react-router-dom";

import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";

const StudyForm = () => {
  return (
    <>
      <Box bg="white" p={3} mb={5} style={{ borderRadius: "10px" }}>
        <Flex alignItems="center" gap={2}>
          <Link to="">
            <ArrowBackIcon w={6} h={6} />
          </Link>

          <Heading as="h3" size="lg" color="gray.600">
            STUDY FORM
          </Heading>

          <Spacer />

          <Link to="">
            <Button colorScheme="blue">
              <AddIcon w={4} h={4} pr={2} />
              Add Districts
            </Button>
          </Link>
        </Flex>
      </Box>

      <form>
        <Box p={4} color="black" bg="white" style={{ borderRadius: "10px" }}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel color="gray.600"> Name </FormLabel>
              <Input type="text" placeholder="Name" />
              <FormErrorMessage>Error Messager</FormErrorMessage>
            </FormControl>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default StudyForm;
