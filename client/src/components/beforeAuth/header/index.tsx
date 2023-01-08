import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Text, Image, VStack } from "@chakra-ui/react";
import { Row } from "react-bootstrap";
import arrow from "src/assets/img/arrownav.svg";
import "./navHeader.scss";
const NavHeader = (props: any) => {
  const { text, linkText, to, backBtn, darkText } = props;
  let history = useHistory();
  return (
    <Row className={"pt-4"}>
      {backBtn && (
        <Button
          onClick={() => history.goBack()}
          bg={"transparent"}
          color="brand.200"
          _hover={{ background: "transparent", outline: "none" }}
          _focus={{ background: "transparent", outline: "none" }}
          _active={{ background: "transparent", outline: "none" }}
          className=" nav__back__btn col-3"
        >
          <Image
            w={"9.75px"}
            mr={"14.14px"}
            h={"16.5px"}
            src={arrow}
            alt="nav Arrow Icon"
          />{" "}
          Back
        </Button>
      )}

      {linkText && (
        <Link className="col nav__link" to={to}  >
          <Text color="white">{text}</Text>
          <Text as={"span"} color="brand.200">
            {linkText}
          </Text>
        </Link>
      )}
      {!linkText && (
        <VStack className=" nav__info col">
          <Text className={"nav__text"} color="brand.200">
            {text}
          </Text>
          <Text className={"dark__text"} as={"span"} color="brand.220">
            {darkText}
          </Text>
        </VStack>
      )}
    </Row>
  );
};

export default NavHeader;
