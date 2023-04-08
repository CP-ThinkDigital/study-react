import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

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
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";

import { Select } from "chakra-react-select";

const states = [
  {
    value: "AL",
    label: "Alabama",
  },
  {
    value: "AK",
    label: "Alaska",
  },
  {
    value: "AZ",
    label: "Arizona",
  },
];

const StudyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

            <FormControl isInvalid={errors.date_of_birth}>
              <FormLabel color="gray.600"> Date Of Birth </FormLabel>
              <Input
                type="date"
                {...register("date_of_birth", {
                  required: "Enter Date Of Birth",
                })}
              />
              <FormErrorMessage>
                {errors.date_of_birth && errors.date_of_birth.message}
              </FormErrorMessage>
            </FormControl>

            <Controller
              control={control}
              name="state"
              rules={{
                required: "Please Select State.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.state}>
                  <FormLabel color="gray.600"> State </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                    options={states}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    placeholder="Select State"
                    closeMenuOnSelect={true}
                  />
                  <FormErrorMessage>
                    {errors.state && errors.state.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <FormControl isInvalid={errors.language}>
              <FormLabel color="gray.600"> Known languages </FormLabel>
              <Stack spacing={5} direction={"row"}>
                <Checkbox
                  size="md"
                  colorScheme="blue"
                  value="tamil"
                  {...register("language", {
                    required: "Please Select",
                  })}
                >
                  Tamil
                </Checkbox>
                <Checkbox
                  size="md"
                  colorScheme="blue"
                  value="english"
                  {...register("language", {
                    required: "Please Select",
                  })}
                >
                  English
                </Checkbox>
                <Checkbox
                  size="md"
                  colorScheme="blue"
                  value="hindi"
                  {...register("language", {
                    required: "Please Select",
                  })}
                >
                  Hindi
                </Checkbox>
              </Stack>
              <FormErrorMessage>
                {errors.language && errors.language.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.gender}>
              <FormLabel color="gray.600"> Gender </FormLabel>
              <RadioGroup>
                <Stack direction="row">
                  <Radio
                    value="male"
                    {...register("gender", {
                      required: "Please Select Gender",
                    })}
                  >
                    Male
                  </Radio>
                  <Radio
                    value="female"
                    {...register("gender", {
                      required: "Please Select Gender",
                    })}
                  >
                    Female
                  </Radio>
                  <Radio
                    value="other"
                    {...register("gender", {
                      required: "Please Select Gender",
                    })}
                  >
                    Other
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>
                {errors.gender && errors.gender.message}
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
