import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Drawer,
  HStack,
  Text,
  DrawerContent,
  IconButton,
  DrawerHeader,
  DrawerBody,
  Button,
  VStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { AuthenticationContext } from "src/services/AuthContext";
import { LayoutContext } from "../../LaytouContext";
import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import logoutIcon from "src/assets/img/logout.svg";
import settingsIcon from "src/assets/img/settings.svg";
import { getLocalStoredData } from "src/_helpers/_localStorage";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import "./sideMenu.scss";
import SideMenuProjectList from "../sideMenuProjects/SideMenuProjectList";
import { Link } from "react-router-dom";
import { UserContext } from "./../../../../services/UserContext";
const SideMenu = (props: any) => {
  const { logout } = useContext(AuthenticationContext);
  const { isOpen, setIsOpen } = useContext(LayoutContext);
  const user = getLocalStoredData(ConstLocalStorage.user);

  const { status, error, data } = useContext(UserContext);
  const [userName, setUserName] = useState(user ? user.name : "");
  useEffect(() => {
    if (status === "success") {
      let updatedName = JSON.stringify(data?.data?.user?.name);
      setUserName(updatedName);
    } else {
      if (getLocalStoredData(ConstLocalStorage.user)) {
        setUserName(getLocalStoredData(ConstLocalStorage.user).name);
      }
    }
  }, [status, error, data?.data, userName]);
  return (
    <Box position="relative">
      <Box position={"absolute"} h={"100%"} minH={"100vh"}>
        <IconButton
          zIndex={6}
          _active={{ ouline: "none", border: "none" }}
          _hover={{ ouline: "none", border: "none" }}
          _focus={{ ouline: "none", border: "none" }}
          bg={"brand.100"}
          position="absolute"
          top={".7rem"}
          left={"1.2rem"}
          color={"white"}
          aria-label="open drawer"
          icon={<HamburgerIcon />}
          onClick={() => setIsOpen(!isOpen)}
        />

        <Drawer
          trapFocus={false}
          closeOnOverlayClick={false}
          placement={"left"}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <DrawerContent color={"brand.800"} bg={"#523FCB"}>
            <DrawerHeader>
              {" "}
              <HStack justifyContent="space-between">
                <Link to={`/`}>
                  <Text fontSize="40px" as={"h1"} _hover={{ color: "white" }}>
                    tasuku
                  </Text>
                </Link>

                <IconButton
                  _hover={{ ouline: "none", border: "none" }}
                  _active={{ ouline: "none", border: "none" }}
                  _focus={{ ouline: "none", border: "none" }}
                  bg={"brand.800"}
                  color={"brand.100"}
                  aria-label="close drawer"
                  icon={<ArrowBackIcon />}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </HStack>
            </DrawerHeader>
            <Flex
              width="320px"
              height="60px"
              bg="rgba(255, 255, 255, 0.21)"
              alignItems="center"
            >
              <Image
                ms="24px"
                borderRadius="full"
                boxSize="45px"
                src={user && user.image}
                alt="user"
              />

              <Box>
                <Text ms="15px" py="13px">
                  {userName
                    .replace(/,/g, " ")
                    .replace(/['"]+/g, "")
                    .replace(/\b\w/g, (c: any) => c.toUpperCase())}
                </Text>
              </Box>
            </Flex>

            <DrawerBody>
              <Text fontSize="14px" color="#C1C1C1" mt="15px" mb="15px">
                {" "}
                Projects
              </Text>

              <SideMenuProjectList />

              <Box position={"relative"}>
                <VStack align={"start"} position="fixed" bottom={"2"}>
                  <Link to={`/settings`}>
                    <Button
                      color={"brand.900"}
                      _active={{
                        ouline: "none",
                        border: "none",
                        background: "transparent",
                      }}
                      _hover={{
                        ouline: "none",
                        border: "none",
                        background: "transparent",
                      }}
                      _focus={{
                        ouline: "none",
                        border: "none",
                        background: "transparent",
                      }}
                      p="0"
                      m="0"
                      bg={"transparent"}
                      w={"fit-content"}
                      onClick={() => {}}
                    >
                      <span>
                        <img src={settingsIcon} alt={"settings"} />
                      </span>{" "}
                      <Text ml={"10px"}>Settings</Text>
                    </Button>
                  </Link>

                  <Button
                    color={"brand.900"}
                    _active={{
                      ouline: "none",
                      border: "none",
                      background: "transparent",
                    }}
                    _hover={{
                      ouline: "none",
                      border: "none",
                      background: "transparent",
                    }}
                    _focus={{
                      ouline: "none",
                      border: "none",
                      background: "transparent",
                    }}
                    p="0"
                    m="0"
                    bg={"transparent"}
                    w={"fit-content"}
                    onClick={() => logout()}
                  >
                    <span>
                      <img src={logoutIcon} alt={"logout"} />
                    </span>{" "}
                    <Text ml={"10px"}>Logout</Text>
                  </Button>
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default SideMenu;
