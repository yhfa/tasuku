import React from "react";
import { SideMenu } from "./sideMenu";
import { ContentWrapper } from "./ContentWrapper";
import LayoutContextComponent from "../LaytouContext";
import { Container } from "react-bootstrap";
const AuthLayout = (props: any) => {
  const { children, modalButton, headerText } = props;
  return (
    <div>
      <LayoutContextComponent>
        <SideMenu />
        <ContentWrapper headerText={headerText} modalButton={modalButton}>
          {children}
        </ContentWrapper>
      </LayoutContextComponent>
    </div>
  );
};

export default AuthLayout;
