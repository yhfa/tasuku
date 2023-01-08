import React, { useState, useContext, useEffect } from "react";
import { Text, VStack, Box } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import NavHeader from "src/components/beforeAuth/header";
import NoAuthLayout from "src/core-ui/BeforeAuth/Layout";
import { useForm } from "react-hook-form";
import { FormErrors } from "src/components/form.Atoms/formErrors";
import { CustomInput } from "src/components/form.Atoms/customInput";
import CustomForm from "src/components/form.Atoms/form";
import { RegisterFormDefault, RegisterFormFields } from "./form";
import { SubmitButton } from "src/components/form.Atoms/SubmitBtn";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from "src/services/AuthContext";
import { MutationResult } from "src/models/NoAuthModules";
import { HOME_ROUTE } from "src/constants/ConstRoutes";
const RegisterComponent = () => {
  let history = useHistory();
  const [errorMessages, setErrorMessages] = useState<any>([]);
  const { registerMutate }: { registerMutate: MutationResult } = useContext(
    AuthenticationContext
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: RegisterFormDefault,
  });

  useEffect(() => {
    if (registerMutate.status === "success") {
      history.push(HOME_ROUTE);
      registerMutate.reset();
      console.log(registerMutate.data);
    }

    if (registerMutate.status === "error") {
      let customError: any = registerMutate.error;
      if (customError?.response.status < 499) {
        setErrorMessages(Object.values(customError?.response?.data));
      }
    }
  }, [registerMutate.status, registerMutate.error]);
  const onSubmit = handleSubmit(async (data) => {
    await registerMutate?.mutate(data);
    return;
  });
  return (
    <NoAuthLayout noScroll>
      <Container style={{ maxHeight: "100vh", overflowY: "scroll" }}>
        <NavHeader
          text={"Already have an account?"}
          linkText={"Log in!"}
          to={"/"}
        />

        <VStack pb={"1rem"} minH={"100vh"}>
          <Box color={"white"} fontSize="38px" py={"2rem"}>
            <Text>
              Best Task{" "}
              <Text as="span" color={"brand.200"}>
                Organizer
              </Text>{" "}
              <Text as="span">For</Text>
            </Text>
            <Text> Teams and projects.</Text>
          </Box>
          <Box px={"2rem"}>
            <CustomForm onSubmit={onSubmit}>
              <FormErrors
                updateStatus={registerMutate?.status}
                errors={errorMessages}
              />
              <Row>
                {RegisterFormFields.map(
                  (field, i) =>
                    field.fieldType === "input" && (
                      <Col key={i} md={field.col}>
                        <CustomInput
                          {...field}
                          errors={errors}
                          registerFN={register}
                          showPwEye={field.type === "password"}
                          watch={field.type === "password"}
                        />
                      </Col>
                    )
                )}
              </Row>
              <SubmitButton errors={errors} text={"Register"} />
            </CustomForm>
          </Box>
        </VStack>
      </Container>
    </NoAuthLayout>
  );
};

export default RegisterComponent;
