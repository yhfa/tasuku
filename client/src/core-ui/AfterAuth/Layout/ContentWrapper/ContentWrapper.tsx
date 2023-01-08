import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { Box } from "@chakra-ui/react";
import { LayoutContext } from "../../LaytouContext";
import Header from "./Header/Header";
const ContentWrapper = (props: any) => {
  const { isOpen } = useContext(LayoutContext);
  const { children, modalButton, headerText } = props;
  return (
    <Box
      ml={isOpen ? "250px" : "0"}
      maxW={isOpen ? "calc(100vw -320px)" : "100%"}
    >
      <Container>
        <Header headerText={headerText}>{modalButton}</Header>
        {children}
      </Container>
    </Box>
  );
};

export default ContentWrapper;
