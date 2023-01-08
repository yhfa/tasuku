import { Button } from "@chakra-ui/button";
import { useContext, useState } from "react";
import { ProjectContext } from "src/services/ProjectContext";
import { Box, Flex, Spacer, Stack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Menu from "src/components/Menu/Menu";
import { MenuItem } from "@chakra-ui/react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import { Skeleton } from "@chakra-ui/react";
import EditProjectModal from './../../../../pages/Authed/Project/modals/editProjectModal/EditProjectModal';
import {
  Project as ProjectType,
} from "src/models/GlobalModules";

const SideMenuProjects = () => {
  /* ********************destructure from the context******************** */
  const { getProjectsResponse, deleteBoardMutation } =
    useContext(ProjectContext);
  const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false);

  /* ********************deleting a board by its id******************** */
  const { projectId } = useParams<{ projectId: string }>();
  let history = useHistory()
  const deleteBoardWithId = async (deleteBoardId: string) => {
    await deleteBoardMutation.mutate({ deleteBoardId });
    if (projectId === deleteBoardId) {
      history.push('/');
    }
  };

  return (
    <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
      {/***********displaying projects***********/}
      {getProjectsResponse.isError && <p>Error fetching data</p>}
      {(getProjectsResponse.isRefetching || deleteBoardMutation.isLoading || getProjectsResponse.isLoading) ? (
        <Stack mt="30px">
          <Skeleton height="15px" width="80%" />
          <Skeleton height="15px" width="80%" />
          <Skeleton height="15px" width="80%" />
        </Stack>
      ) : (
        getProjectsResponse.isSuccess && (
          <>
            {getProjectsResponse?.data?.data?.boards?.map((project: ProjectType) => (
              <Flex key={project["_id"]}  >
                <Link to={`/projects/${project._id}`}>
                  <Button
                    ps="0"
                    bg="transparent"
                    fontWeight="light"
                    color="white"
                    fontSize="20px"
                    _hover={{
                      opacity: 0.5,
                      color: "white",
                      outline: "none",
                      cursor: "pointer",
                    }}
                    _focus={{ opacity: 0.5, color: "white", outline: "none" }}
                    _active={{ opacity: 0.5, color: "white", outline: "none" }}
                  >
                    {project.title}
                  </Button>
                </Link>
                <Spacer />
                <Box
                  alignSelf="flex-start"
                  _hover={{ bg: "transparent", color: "white" }}
                  _active={{ bg: "transparent", color: "white" }}
                  _expanded={{ bg: "transparent", color: "white" }}
                >
                  <Menu btnColor="white" opacityOnHover={0.5}>
                    <MenuItem
                      color="black"
                      _hover={{ bg: "transparent", color: "blue.400" }}
                      _active={{ bg: "transparent", color: "blue.400" }}
                      _expanded={{ bg: "transparent", color: "blue.400" }}
                      icon={<MdOutlineEdit />}
                      onClick={() => { setIsEditProjectOpen(true) }}
                    >
                      Edit
                    </MenuItem>

                    <EditProjectModal
                      project={project}
                      isOpen={isEditProjectOpen}
                      setIsOpen={setIsEditProjectOpen} />

                    <MenuItem
                      color="black"
                      _hover={{ bg: "transparent", color: "blue.400" }}
                      _active={{ bg: "transparent", color: "blue.400" }}
                      _expanded={{ bg: "transparent", color: "blue.400" }}
                      icon={<MdOutlineDelete color="red" />}
                      onClick={() => deleteBoardWithId(project["_id"])}
                    >
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              </Flex>
            ))}
          </>
        )
      )}
    </div>
  );
};
export default SideMenuProjects;
