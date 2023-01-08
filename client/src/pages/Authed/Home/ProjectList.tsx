import React from "react";
import { Box } from "@chakra-ui/react";
import { Col, Row } from "react-bootstrap";

import ProjectItem from "./ProjectItem";
import { Project as ProjectType } from "src/models/GlobalModules/index";

const ProjectList: React.FC<{
  loadedProjects: ProjectType[];
}> = (props) => {
  const { loadedProjects } = props;
  return (
    <Box bg={"transparent"} overflowX="hidden">
      <Row className={"mt-3 p-2"}>
        {loadedProjects.map((project: ProjectType, index: number) => (
          <Col key={index} sm={12} md={4}>
            <ProjectItem key={project.id} loadedProject={project} />
          </Col>
        ))}
      </Row>
    </Box>
  );
};
export default ProjectList;
