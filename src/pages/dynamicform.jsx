import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  Heading,
  FormErrorMessage,
  Stack,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";

import { Select } from "chakra-react-select";

import CustomBox from "../components/customBox";

const customers = [
  {
    name: "Ameer",
    mobile: "9998889988",
    city: "Tirupur",
  },
  {
    name: "John",
    mobile: "9999988888",
    city: "Chennai",
  },
  {
    name: "Siva",
    mobile: "8888833333",
    city: "Trichy",
  },
];

const items = [
  {
    id: 1,
    itemName: "Item 1",
    hsn: "565656",
    mrp: 120.5,
    qty: "",
    price: 110,
    discount: "",
    tax: 12,
    amount: "",
  },
  {
    id: 2,
    itemName: "Item 2",
    hsn: "443322",
    mrp: 100,
    qty: "",
    price: 100,
    discount: "",
    tax: 10,
    amount: "",
  },
  {
    id: 3,
    itemName: "Item 3",
    hsn: "123456",
    mrp: 500,
    qty: "",
    price: 450,
    discount: "",
    tax: 18,
    amount: "",
  },
  {
    id: 4,
    itemName: "Item 4",
    hsn: "332165",
    mrp: 1200,
    qty: "",
    price: 1150,
    discount: "",
    tax: 18,
    amount: "",
  },
  {
    id: 5,
    itemName: "Item 5",
    hsn: "788955",
    mrp: 20,
    qty: "",
    price: 15,
    discount: "",
    tax: 6,
    amount: "",
  },
];

const DynamicForm = () => {
  const [total, setTotal] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    getValues,
    watch,
  } = useForm({ mode: "onChange" });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "Items",
  });

  const watchItems = watch("Items");

  if (itemFields.length === 0) {
    appendItem();
  }

  const itemChange = (e, index) => {
    setValue(`Items.${index}.item.itemName`, e.itemName);
    setValue(`Items.${index}.hsn`, e.hsn);
    setValue(`Items.${index}.mrp`, e.mrp);
    setValue(`Items.${index}.qty`, 1, { shouldValidate: true });
    setValue(`Items.${index}.price`, e.price, { shouldValidate: true });
    setValue(`Items.${index}.discount`, e.discount);
    setValue(`Items.${index}.tax`, e.tax);
    amountCalculation(index);
  };

  const itemPropChange = (index, propName, value) => {
    setValue(`Items.${index}.${propName}`, value);
    amountCalculation(index);
  };

  const amountCalculation = (index) => {
    let qty = Number(getValues(`Items.${index}.qty`));
    let price = Number(getValues(`Items.${index}.price`));
    let discount = Number(getValues(`Items.${index}.discount`));
    let tax = Number(getValues(`Items.${index}.tax`));

    let amount = qty * price - discount;
    let taxInRs = (tax / 100) * amount;
    let finalAmount = qty * price + taxInRs;

    setValue(`Items.${index}.amount`, finalAmount);
    setTotal(watchItems.reduce((acc, item) => acc + item.amount, 0));
  };

  const onFormSubmit = (data) => console.log(data);

  return (
    <>
      <CustomBox>
        <Flex alignItems="center" gap={2}>
          <Link to="">
            <ArrowBackIcon w={6} h={6} />
          </Link>

          <Heading as="h3" size="lg">
            DYNAMIC FORM
          </Heading>
        </Flex>
      </CustomBox>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <CustomBox>
          <Flex gap={4}>
            <Controller
              control={control}
              name="party"
              rules={{
                required: "Please Select Party.",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <FormControl isInvalid={errors.party}>
                  <FormLabel> Party </FormLabel>
                  <Select
                    name={name}
                    ref={ref}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    onBlur={onBlur}
                    value={value}
                    options={customers}
                    getOptionLabel={(e) => e.name}
                    getOptionValue={(e) => e.name}
                    placeholder="Select Party"
                    closeMenuOnSelect={true}
                    size="sm"
                  />
                  <FormErrorMessage>
                    {errors.party && errors.party.message}
                  </FormErrorMessage>
                </FormControl>
              )}
            />

            <FormControl isInvalid={errors.invoice_number}>
              <FormLabel> Invoide Number </FormLabel>
              <Input
                type="number"
                placeholder="Invoice Number"
                {...register("invoice_number", {
                  required: "Invoice Number is Empty",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.invoice_number && errors.invoice_number.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.invoice_date}>
              <FormLabel> Invoice Date </FormLabel>
              <Input
                type="date"
                {...register("invoice_date", {
                  required: "Select Date",
                })}
                size="sm"
              />
              <FormErrorMessage>
                {errors.invoice_date && errors.invoice_date.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
        </CustomBox>

        <CustomBox>
          <TableContainer
            style={{ overflowX: "visible", overflowY: "visible" }}
          >
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th> No </Th>
                  <Th w={300}> Items </Th>
                  <Th> HSN </Th>
                  <Th> MRP </Th>
                  <Th> QTY </Th>
                  <Th> Price </Th>
                  <Th> Discount (Rs) </Th>
                  <Th> Tax (%) </Th>
                  <Th> Amount </Th>
                  <Th> Act </Th>
                </Tr>
              </Thead>
              <Tbody>
                {itemFields &&
                  itemFields.map((item, index) => {
                    return (
                      <Tr key={item.id}>
                        <Td> {index + 1} </Td>
                        <Td>
                          <Controller
                            control={control}
                            name={`Items.${index}.item`}
                            rules={{
                              required: "Please Select Item.",
                            }}
                            render={({
                              field: { onChange, onBlur, value, name, ref },
                            }) => (
                              <FormControl
                                isInvalid={errors.Items?.[index]?.item}
                              >
                                <Select
                                  className="z-index"
                                  name={name}
                                  ref={ref}
                                  onChange={(e) => {
                                    onChange(e);
                                    itemChange(e, index);
                                  }}
                                  onBlur={onBlur}
                                  value={value}
                                  options={items}
                                  getOptionLabel={(e) => e.itemName}
                                  getOptionValue={(e) => e.id}
                                  placeholder="Select item"
                                  closeMenuOnSelect={true}
                                  size="sm"
                                />
                                <FormErrorMessage>
                                  {errors.Items?.[index]?.item?.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          />
                        </Td>

                        <Td>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="HSN"
                              {...register(`Items.${index}.hsn`)}
                              disabled={true}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="MRP"
                              {...register(`Items.${index}.mrp`)}
                              disabled={true}
                              size="sm"
                              className="textRight"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.qty}>
                            <Input
                              type="text"
                              placeholder="Qty"
                              {...register(`Items.${index}.qty`, {
                                required: "Qty is Empty",
                                onChange: (e) =>
                                  itemPropChange(index, "qty", e.target.value),
                              })}
                              size="sm"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.qty?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl isInvalid={errors.Items?.[index]?.price}>
                            <Input
                              type="text"
                              placeholder="Price"
                              {...register(`Items.${index}.price`, {
                                required: "Please Enter Price",
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "price",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                              className="textRight"
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.price?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Discount"
                              {...register(`Items.${index}.discount`, {
                                onChange: (e) =>
                                  itemPropChange(
                                    index,
                                    "discount",
                                    e.target.value
                                  ),
                              })}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Tax (%)"
                              {...register(`Items.${index}.tax`)}
                              disabled={true}
                              size="sm"
                            />
                          </FormControl>
                        </Td>

                        <Td isNumeric>
                          <FormControl
                            isInvalid={errors.Items?.[index]?.amount}
                          >
                            <Input
                              type="number"
                              placeholder="Amount"
                              {...register(`Items.${index}.amount`)}
                              size="sm"
                              className="textRight"
                              disabled={true}
                            />
                            <FormErrorMessage>
                              {errors.Items?.[index]?.amount?.message}
                            </FormErrorMessage>
                          </FormControl>
                        </Td>

                        <Td>
                          <Button
                            colorScheme="blue"
                            onClick={() => removeItem(index)}
                            size="sm"
                          >
                            <DeleteIcon w={3} h={3} />
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </CustomBox>

        <CustomBox>
          <Stack>
            <Button colorScheme="teal" onClick={() => appendItem()}>
              +Add New Item
            </Button>
          </Stack>
        </CustomBox>

        <CustomBox>
          <TableContainer>
            <Table variant="striped" size="sm">
              <Tbody>
                <Tr>
                  <Td> </Td>
                  <Td w={300}> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> </Td>
                  <Td> Total</Td>
                  <Td> {total} </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </CustomBox>

        <CustomBox>
          <Stack>
            <Button colorScheme="blue" type="submit">
              Submit
            </Button>
          </Stack>
        </CustomBox>
      </form>
    </>
  );
};

export default DynamicForm;
