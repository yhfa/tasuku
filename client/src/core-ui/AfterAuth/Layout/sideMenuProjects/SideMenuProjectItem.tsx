import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Flex, MenuItem, Box, Spacer, Button } from "@chakra-ui/react";

import { MdOutlineDelete } from "react-icons/md";
import { Project as ProjectType } from "src/models/GlobalModules";
import Menu from "src/components/Menu/Menu";
import DeleteProjectModal from "./DeleteProjectModal";

const SideMenuProjectItem: React.FC<{
  project: ProjectType;
}> = (props) => {
  const { project } = props;
  const [isDeleteProjectOpen, setIsDeleteProjectOpen] =
    useState<boolean>(false);

  return (
    <Flex key={project["_id"]}>
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
          _active={{
            opacity: 0.5,
            color: "white",
            outline: "none",
          }}
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
            icon={<MdOutlineDelete color="red" />}
            onClick={() => setIsDeleteProjectOpen(true)}
          >
            Delete
            <DeleteProjectModal
              isOpen={isDeleteProjectOpen}
              setIsOpen={setIsDeleteProjectOpen}
              menuProjectId={project._id}
              projectTitle={project.title}
            />
          </MenuItem>
        </Menu>
      </Box>
    </Flex>
  );
};

export default SideMenuProjectItem;
