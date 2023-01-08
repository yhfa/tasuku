import React from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Box } from "@chakra-ui/react";
import SectionItem from "./SectionItem";

import { ReorderTaskaAPI } from "src/api/task/TaskAPI";
import { ReorderSectionsAPI } from "src/api/section/SectionAPI";
import {
  TransformedSection as SectionType,
  ProjectActionKind,
} from "src/models/GlobalModules/index";
import { Row, Col, Container } from "react-bootstrap";
import { AlertError, SuccessAlert } from "src/components/Alerts";

const SectionList: React.FC<{
  sections: SectionType[];
  projectDispatch: any;
  refetchProject: any;
}> = (props) => {
  const { sections, projectDispatch, refetchProject } = props;
  const { projectId } = useParams<{ projectId: string }>();

  const reorderTasksMutation = useMutation(ReorderTaskaAPI);
  const reorderSectionsMutation = useMutation(ReorderSectionsAPI);

  const dragEndHandler = async (result: DropResult) => {
    const { destination, draggableId, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === "column") {
      projectDispatch({
        type: ProjectActionKind.reorderSections,
        payload: {
          source,
          destination,
        },
      });
      try {
        await reorderSectionsMutation.mutateAsync({
          data: {
            boardId: projectId,
            sourceIndex: source.index,
            destinationIndex: destination.index,
          },
        });
        SuccessAlert("Section has been moved");
      } catch (err) {
        let customErr: any = reorderSectionsMutation.error;
        AlertError(customErr?.response?.data?.message);
        refetchProject();
      }
      return;
    }

    projectDispatch({
      type: ProjectActionKind.reorderTasks,
      payload: {
        draggableId,
        source,
        destination,
      },
    });
    try {
      await reorderTasksMutation.mutateAsync({
        data: {
          taskId: draggableId,
          sourceColumn: source.droppableId,
          sourceIndex: source.index,
          destinationColumn: destination.droppableId,
          destinationIndex: destination.index,
        },
      });
      SuccessAlert("Task has been moved");
    } catch (err) {
      let customErr: any = reorderTasksMutation.error;
      AlertError(customErr?.response?.data?.message);
      refetchProject();
    }
  };

  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Box overflowX={"auto"} minH={"100vh"}>
            <Row
              className={"mt-3 flex-nowrap w-100 h-100 p-2"}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sections.map((section: SectionType, index) => (
                <Col
                  key={section.title}
                  // sm={12}
                  // style={{ minWidth: "20rem" }}
                  // md={4}
                >
                  <SectionItem
                    index={index}
                    section={section}
                    projectDispatch={projectDispatch}
                  />
                </Col>
              ))}
              {provided.placeholder}
            </Row>
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionList;
