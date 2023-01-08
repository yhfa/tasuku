import { useState, useEffect, useReducer } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { AddIcon } from "@chakra-ui/icons";
import { Button, Heading, HStack, Spinner } from "@chakra-ui/react";

import { AuthLayout } from "src/core-ui/AfterAuth";
import EditProjectModal from "./modals/editProjectModal/EditProjectModal";
import AddSectionModal from "./modals/addSectionModal/AddSectionModal";
import SectionList from "./sections/SectionList";
import { ProjectActionKind } from "src/models/GlobalModules/index";

import projectReducer from "./reducer/projectReducer";
import { GetProjectAPI } from "src/api/project/ProjectAPI";
import ImageStack from "src/components/Images/ImageStack";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const [projectState, dispatch] = useReducer(projectReducer, null);
  const [isAddSectionOpen, setIsAddSectionOpen] = useState<boolean>(false);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false);

  const { data, refetch: refetchProject } = useQuery(
    ["projects", projectId],
    GetProjectAPI.bind(null, projectId),
    { enabled: true }
  );

  useEffect(() => {
    const loadedProject: any = data?.data;
    dispatch({
      type: ProjectActionKind.loadProject,
      payload: loadedProject?.board,
    });
  }, [data]);

  let membersImages = projectState?.members?.map((member: any) => member.image);
  return (
    <AuthLayout
      headerText={projectState?.title}
      modalButton={
        <HStack justify="flex-end">
          {data?.request.statusText === "OK" &&
            (projectState?.members?.length < 1 ? (
              <Heading color="gray.400" size="sm">
                No Members Yet
              </Heading>
            ) : (
              <ImageStack
                marginRight="140px"
                imgList={membersImages}
                justifyContent="flex-start"
                stackHeight={10}
                stackWidth={10}
                imageWidth="10"
                borderRadius="100"
                spacing={-12}
              />
            ))}

          <Button
            onClick={() => setIsEditProjectOpen(true)}
            borderRadius="18"
            px="10"
          >
            <Heading as="h4" size="xs">
              Edit
            </Heading>
          </Button>
          <Button
            onClick={() => setIsAddSectionOpen(true)}
            bg="yellow.100"
            color="white"
            _hover={{ background: "yellow.100", outline: "none" }}
            _active={{ background: "yellow.100", outline: "none" }}
            borderRadius="18"
            width="30"
          >
            <HStack>
              <AddIcon fontSize="sm" color="yellow.500" />
              <Heading as="h4" size="xs" color="yellow.500">
                Section
              </Heading>
            </HStack>
          </Button>
          {projectState && (
            <>
              <EditProjectModal
                isOpen={isEditProjectOpen}
                setIsOpen={setIsEditProjectOpen}
                project={projectState}
                projectDispatch={dispatch}
              />
              <AddSectionModal
                isOpen={isAddSectionOpen}
                setIsOpen={setIsAddSectionOpen}
                projectId={projectState.id}
                projectDispatch={dispatch}
              />
            </>
          )}
        </HStack>
      }
    >
      {projectState ? (
        <SectionList
          sections={projectState.columns}
          projectDispatch={dispatch}
          refetchProject={refetchProject}
        />
      ) : (
        <Spinner size="xl" mt="100px" ms="400px"></Spinner>
      )}
    </AuthLayout>
  );
}
