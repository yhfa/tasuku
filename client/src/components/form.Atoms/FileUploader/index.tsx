import React, { useEffect } from "react";
import { FormGroup, FormLabel as Label } from "react-bootstrap";
import file from "src/assets/img/file.svg";
import {
  Input,
  Box,
  InputGroup,
  InputRightElement,
  Image,
} from "@chakra-ui/react";
import "src/components/Atoms/form.Atoms/customInput/input.css";
const FileUploader = (props: any) => {
  const { onChange, value, fieldLabel, invalidInput, setInvalidInput } = props;

  useEffect(() => {}, [value, invalidInput]);
  return (
    <FormGroup className="input__formG">
      <div className="input-Container">
        <Label>{fieldLabel}</Label>
        <Box cursor="pointer" position="absolute" w="100%" zIndex="-1">
          <Box position="relative">
            <InputGroup size="md">
              <Input
                onChange={onChange}
                readOnly
                value={value.replace(/^.*\\/, "")}
                cursor="pointer"
              />
              <InputRightElement width="4.5rem" top="18%">
                <Image src={file} alt="upload file input" />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Input
          onInput={() => setInvalidInput(false)}
          required
          onChange={onChange}
          type="file"
          opacity="0"
        />
        {invalidInput && (
          <span className="input-error">
            CV is required and it must me a pdf file
          </span>
        )}
      </div>
    </FormGroup>
  );
};

export default FileUploader;
