import { useState, useContext } from "react";
import { Button, Heading, HStack, Spinner } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { AuthLayout } from "src/core-ui/AfterAuth";
import { getLocalStoredData } from "src/_helpers/_localStorage";
import { ConstLocalStorage } from "src/constants/ConstLocalStorage";
import AddProject from "./AddProjectModal";
import ProjectList from "./ProjectList";
import { ProjectContext } from "src/services/ProjectContext";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [userName, setUserName] = useState(
    getLocalStoredData(ConstLocalStorage.user)
      ? getLocalStoredData(ConstLocalStorage.user).name
      : ""
  );

  const { getProjectsResponse, deleteBoardMutation } =
    useContext(ProjectContext);
  let myBoards = getProjectsResponse?.data?.data?.boards;
  return (
    <AuthLayout
      headerText={`Hey, ${userName &&
        userName.split(",")[1].charAt(1).toUpperCase() +
        userName.split(",")[1].slice(2).replace(/['"]+/g, "")
        }`}
      modalButton={
        <>
          <Button
            onClick={() => setIsOpen(true)}
            bg="brand.700"
            color="white"
            _hover={{ background: "brand.100", outline: "none" }}
            _active={{ background: "brand.100", outline: "none" }}
          >
            <HStack>
              <AddIcon fontSize="sm" />
              <Heading as="h4" size="sm">
                Add Project
              </Heading>
            </HStack>
          </Button>
          <AddProject isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      }
    >
      {getProjectsResponse.isLoading || deleteBoardMutation.isLoading || getProjectsResponse.isRefetching ? (
        <Spinner size="xl" mt="100px" ms="400px" />
      ) : (
        <div
          style={{
            maxHeight: "86.6vh",
            overflow: "auto",
            paddingBottom: "30px",
          }}
        >
          <ProjectList loadedProjects={myBoards} />
        </div>
      )}
    </AuthLayout>
  );
}
