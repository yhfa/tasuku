import Card from "src/components/Cards/Card";
import { HStack, Heading } from "@chakra-ui/react";

const Header: React.FC<{ headerText: string }> = (props) => {
  const { children, headerText } = props;
  return (
    <Card>
      <HStack
        flexWrap={"wrap"}
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        p={4}
      >
        <Heading fontWeight="bold" size="lg">
          {headerText}
        </Heading>
        {children}
      </HStack>
    </Card>
  );
};

export default Header;
