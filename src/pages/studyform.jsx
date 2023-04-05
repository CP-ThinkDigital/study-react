import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => console.log(data);

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

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Box p={4} color="black" bg="white" style={{ borderRadius: "10px" }}>
          <Stack spacing={4}>
            <FormControl isInvalid={errors?.name}>
              <FormLabel color="gray.600"> Name </FormLabel>
              <Input
                type="text"
                placeholder="Name"
                {...register("name", { required: "Name Field is Empty" })}
              />
              <FormErrorMessage>
                {errors?.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors?.age}>
              <FormLabel color="gray.600"> Age </FormLabel>
              <Input
                type="number"
                placeholder="Age"
                {...register("age", {
                  required: {
                    value: true,
                    message: "Age Field is Empty",
                  },
                  min: {
                    value: 18,
                    message: "Age must be greater than 18",
                  },
                })}
              />
              <FormErrorMessage>
                {errors?.age && errors.age.message}
              </FormErrorMessage>
            </FormControl>

            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </>
  );
};

export default StudyForm;
