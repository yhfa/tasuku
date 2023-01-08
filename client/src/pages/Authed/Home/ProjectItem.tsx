import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { VStack, Heading, HStack, Box, MenuItem } from "@chakra-ui/react";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import moment from "moment";

import Card from "src/components/Cards/Card";
import ImageStack from "src/components/Images/ImageStack";
import Menu from "src/components/Menu/Menu";
import {
  Project as ProjectType,
  Member as MemberType,
} from "src/models/GlobalModules/index";
import { ProjectContext } from "src/services/ProjectContext";
import EditProjectModal from "./../Project/modals/editProjectModal/EditProjectModal";

const ProjectItem: React.FC<{
  loadedProject: ProjectType;
}> = (props) => {
  const { deleteBoardMutation } = useContext(ProjectContext);
  const deleteBoardWithId = async (deleteBoardId: string) => {
    deleteBoardMutation.mutate({ deleteBoardId });
  };
  const {
    loadedProject: { title, createdAt, id, members },
  } = props;
  const [isEditProjectOpen, setIsEditProjectOpen] = useState<boolean>(false);

  const membersImages = members.map((member: MemberType) => member.image);

  return (
    <Card className={"m-1"}>
      <HStack justify="space-between" p="4">
        <Link to={`/projects/${id}`}>
          <VStack justify="space-between" align="flex-start">
            <Heading fontWeight="bold" color="black" size="md">
              {title}
            </Heading>
            {membersImages.length > 0 ? (
              <ImageStack
                imgList={membersImages}
                justifyContent="flex-start"
                stackHeight={16}
                stackWidth={20}
                imageWidth="10"
                borderRadius="100"
                spacing={-12}
              />
            ) : (
              <Heading color="gray.400" size="xs" h={16} paddingTop={7}>
                No Members Yet
              </Heading>
            )}
            <Heading
              fontWeight="normal"
              size="xs"
              color="gray.500"
              paddingTop={5}
            >
              Created at {moment(createdAt).fromNow()}
            </Heading>
          </VStack>
        </Link>

        <Box alignSelf="flex-start">
          <Menu btnColor="black" opacityOnHover={0.5}>
            <MenuItem
              icon={<MdOutlineEdit />}
              onClick={() => setIsEditProjectOpen(true)}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<MdOutlineDelete color="red" />}
              onClick={() => deleteBoardWithId(id)}
            >
              Delete
            </MenuItem>
          </Menu>
        </Box>
      </HStack>
      <EditProjectModal
        isOpen={isEditProjectOpen}
        setIsOpen={setIsEditProjectOpen}
        project={props.loadedProject}
      />
    </Card>
  );
};
export default ProjectItem;
