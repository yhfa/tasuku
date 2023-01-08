import React, { useContext, useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { Container, Row, Col } from "react-bootstrap";
import NavHeader from "src/components/beforeAuth/header";
import NoAuthLayout from "src/core-ui/BeforeAuth/Layout";
import { useForm } from "react-hook-form";
import { FormErrors } from "src/components/form.Atoms/formErrors";
import { CustomInput } from "src/components/form.Atoms/customInput";
import CustomForm from "src/components/form.Atoms/form";
import { LogInFormDefault, LogInFormFields } from "./form";
import { SubmitButton } from "src/components/form.Atoms/SubmitBtn";
import { AuthenticationContext } from "src/services/AuthContext";
import { MutationResult } from "src/models/NoAuthModules";
import { useHistory } from "react-router-dom";
import { HOME_ROUTE } from "src/constants/ConstRoutes";
const LoginComponent = () => {
  const { login }: { login: MutationResult } = useContext(
    AuthenticationContext
  );
  const [errorMessages, setErrorMessages] = useState<any>([]);
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: LogInFormDefault,
  });

  useEffect(() => {
    if (login.status === "success") {
      history.push(HOME_ROUTE);
      login.reset();
      console.log(login.data);
    }
    if (login.status === "error") {
      let customError: any = login.error;
      if (customError && customError.response) {
        if (customError?.response.status < 499) {
          setErrorMessages(Object.values(customError?.response?.data));
        }
      }
    }
  }, [login.status, login.error]);

  const onSubmit = handleSubmit(async (data) => {
    await login?.mutate(data);
  });
  return (
    <NoAuthLayout noScroll>
      <Container>
        <NavHeader
          text={"first Time seeing this?"}
          linkText={"Sign Up!"}
          to={"/register"}
        />
        <VStack overflowY={"hidden"} minH={"100vh"}>
          <Box>
            <Text m={0} mt={0} color={"white"} fontSize="48px" pt={"2rem"}>
              Finish your work
            </Text>
            <Text m={0} mt={0} fontSize="48px" color={"white"}>
              <Text as={"span"} color={"brand.200"}>
                Quickly &nbsp;
              </Text>
              and
            </Text>
            <Text m={0} mt={0} pb={"3rem"} color={"brand.200"} fontSize="48px">
              Efficiently.
            </Text>
          </Box>
          <CustomForm onSubmit={onSubmit}>
            <FormErrors updateStatus={login?.status} errors={errorMessages} />
            <Row>
              {LogInFormFields.map(
                (field, i) =>
                  field.fieldType === "input" && (
                    <Col key={i} md={field.col}>
                      <CustomInput
                        {...field}
                        errors={errors}
                        registerFN={register}
                        showPwEye={field.type === "password"}
                      />
                    </Col>
                  )
              )}
            </Row>
            <SubmitButton errors={errors} text={"Log in"} />
          </CustomForm>
        </VStack>
      </Container>
    </NoAuthLayout>
  );
};

export default LoginComponent;
