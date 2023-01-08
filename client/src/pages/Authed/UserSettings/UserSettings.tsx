import { useState, useEffect, useContext, useRef, ChangeEvent } from "react";
import { Button, Heading, HStack, VStack, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

import { AuthLayout } from "src/core-ui/AfterAuth";
import DeleteUserModal from "./DeleteUserModal";
import CustomInput from "./UserSettingsIndex";
import CustomForm from "src/components/form.Atoms/form";
import { FormErrors } from "src/components/form.Atoms/formErrors";
import { SubmitButton } from "src/components/form.Atoms/SubmitBtn";
import RoundedImage from "src/components/Images/RoundedImage";
import { UserSettingsFormFields } from "./form";
import { SuccessAlert } from "src/components/Alerts";
import { AlertError } from "src/components/Alerts";
import { useHistory } from "react-router-dom";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import { UserContext } from "./../../../services/UserContext";
import { InfoAlert } from "src/components/Alerts/index";
import {
  getLocalStoredData,
  setLocalStoredData,
} from "src/_helpers/_localStorage";

export default function UserSettings() {
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const filePickerRef = useRef<HTMLInputElement>(null);
  let history = useHistory();

  const user = getLocalStoredData(ConstLocalStorage.user);
  let firstName = user.name.split(" ").slice(0, -1).join(" ").replace(",", "");
  let lastName = user.name.split(" ").slice(-1).join(" ");
  let userImage = user.image;
  const { status, error, reset, data, EditUserMutaion, isLoading } =
    useContext(UserContext);

  const [pickedImage, setPickedImage] = useState<any>(userImage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      firstName: `${firstName}`,
      lastName: `${lastName}`,
      email: `${user.email}`,
    },
  });

  const pickHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const pickImageHandler = () => {
    if (filePickerRef && filePickerRef.current) {
      filePickerRef.current.click();
    }
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  useEffect(() => {
    if (status === "success") {
      if (data && data.data.user) {
        setLocalStoredData(ConstLocalStorage.user, data.data.user);
        SuccessAlert("User Information Updated");
      }
      reset();
      history.push("/");
    }
    if (isLoading) {
      InfoAlert("Updating your info")
    }
    if (status === "error") {
      let customErr: any = error;
      AlertError(customErr?.response?.data?.message);
    }
  }, [status, error, data?.data, history, data, reset, isLoading]);

  const onSubmit = handleSubmit(async (formData: any) => {
    let data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      image: pickedImage,
      password: formData.password,
      newPassword: formData.newPassword,
    };
    EditUserMutaion({ data });
  });

  return (
    <AuthLayout
      headerText={"Edit Profile"}
      modalButton={
        <>
          <Button
            onClick={() => setIsDeleteUserOpen(true)}
            bg="red"
            color="white"
            _hover={{ background: "red.400", outline: "none" }}
            _active={{ background: "red.400", outline: "none" }}
          >
            <HStack>
              <Heading as="h4" size="sm">
                Delete Account
              </Heading>
            </HStack>
          </Button>
          <DeleteUserModal
            isOpen={isDeleteUserOpen}
            setIsOpen={setIsDeleteUserOpen}
          />
        </>
      }
    >
      <VStack
        minH={"100vh"}
        mt="5px"
        justifyContent="flex-start"
        alignItems="center"
      >
        <RoundedImage src={pickedImage} width={"7rem"} spacing={0} />
        <Input
          ref={filePickerRef}
          onChange={pickHandler}
          type="file"
          display="none"
          accept=".jpg,.png,.jpeg"
        />
        <Button
          onClick={pickImageHandler}
          style={{ maxWidth: "9rem", maxHeight: "2rem" }}
          borderRadius="20px"
          bg="#00000029"
          color="black"
          _hover={{ background: "#C1C1C1", outline: "none" }}
          _active={{ background: "#C1C1C1", outline: "none" }}
        >
          Update Image
        </Button>
        <CustomForm onSubmit={onSubmit}>
          <FormErrors errors={errors} />
          <Row>
            {UserSettingsFormFields.map(
              (field, i) =>
                field.fieldType === "input" && (
                  <Col key={i} md={field.col}>
                    <CustomInput
                      errors={errors}
                      {...field}
                      registerFN={register}
                      showPwEye={field.type === "password"}
                      watch={field.type === "password"}
                    />
                  </Col>
                )
            )}
          </Row>
          <SubmitButton errors={errors} text={"Update My Info"} disabledBtn={isLoading} />
        </CustomForm>
      </VStack>
    </AuthLayout>
  );
}
