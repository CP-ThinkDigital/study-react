import React from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  Stack,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Link,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import CustomBox from "../components/customBox";

import { useDispatch } from "react-redux";
import { addState } from "../features/study/studySlice";

const AddState = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addState(data));
  };

  return (
    <>
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="/chit">
            <ArrowBackIcon w={6} h={6} />
          </Link>
          <Heading as="h3" size="lg" color="gray.600">
            State Form
          </Heading>
        </Flex>
      </CustomBox>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomBox>
          <Stack spacing={4}>
            <FormControl isInvalid={errors.value}>
              <FormLabel color="gray.600"> Name </FormLabel>
              <Input
                type="text"
                placeholder="Value"
                {...register("value", {
                  required: "Enter Value",
                })}
              />
              <FormErrorMessage>
                {errors.value && errors.value.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.label}>
              <FormLabel color="gray.600"> Name </FormLabel>
              <Input
                type="text"
                placeholder="Label"
                {...register("label", {
                  required: "Enter Label",
                })}
              />
              <FormErrorMessage>
                {errors.label && errors.label.message}
              </FormErrorMessage>
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Next
            </Button>
          </Stack>
        </CustomBox>
      </form>
    </>
  );
};

export default AddState;
