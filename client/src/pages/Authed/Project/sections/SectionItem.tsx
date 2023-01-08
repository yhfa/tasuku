import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  VStack,
  Heading,
  HStack,
  Button,
  Divider,
  Box,
  MenuItem,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { MdOutlineEdit, MdOutlineDelete, MdDoneAll } from "react-icons/md";

import {
  Task as TaskType,
  TransformedSection as SectionType,
} from "src/models/GlobalModules/index";
import Card from "src/components/Cards/Card";
import Menu from "src/components/Menu/Menu";
import Task from "../tasks/Task";
import AddTaskModal from "src/pages/Authed/Project/modals/addTaskModal/AddTaskModal";
import EditSectionModal from "src/pages/Authed/Project/modals/editSectionModal/EditSectionModal";
import DeleteSectionModal from "src/pages/Authed/Project/modals/deleteSectionModal/DeleteSectionModal";
import CompelteAllTasksModal from "src/pages/Authed/Project/modals/compelteAllTasksModal/CompelteAllTasksModal";

const SectionItem: React.FC<{
  section: SectionType;
  projectDispatch: any;
  index: number;
}> = (props) => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState<boolean>(false);
  const [isEditSectionOpen, setIsEditSectionOpen] = useState<boolean>(false);
  const [isCompleteAllTasksOpen, setIsCompleteAllTasksOpen] =
    useState<boolean>(false);
  const [isDeleteSectionOpen, setIsDeleteSectionOpen] =
    useState<boolean>(false);

  const {
    section: { title, tasks },
    projectDispatch,
    index,
  } = props;
  const { projectId } = useParams<{ projectId: string }>();

  const finishedTaskCount = tasks.reduce((count: number, task) => {
    if (task.state === "Done") count++;
    return count;
  }, 0);

  return (
    <Draggable draggableId={title} index={index}>
      {(provided) => (
        <Box
          // minWidth="250px"
          // minH="81vh"
          m={"1rem"}
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Card>
            <VStack align="flex-start" px="2" py="4" minH="80">
              <HStack justify="space-between" flexWrap={"nowrap"} w="20rem">
                <Heading as="h4" size="sm">
                  {title}
                </Heading>
                <Box>
                  <Button
                    onClick={() => setIsAddTaskOpen(true)}
                    bg="brand.700"
                    color="white"
                    _hover={{ background: "brand.100" }}
                    _active={{ background: "brand.100" }}
                    borderRadius="18"
                    width="22"
                  >
                    <HStack>
                      <AddIcon fontSize="12px" fontWeight="bold" />
                      <Heading as="h4" fontSize="12px">
                        Add Task
                      </Heading>
                    </HStack>
                    <AddTaskModal
                      projectId={projectId}
                      sectionTitle={title}
                      numberOfTasks={props.section.tasks.length}
                      isOpen={isAddTaskOpen}
                      setIsOpen={setIsAddTaskOpen}
                      projectDispatch={projectDispatch}
                    />
                  </Button>
                  <Menu btnColor="black" opacityOnHover={0.5}>
                    <MenuItem
                      icon={<MdDoneAll />}
                      isDisabled={!tasks.length}
                      onClick={() => setIsCompleteAllTasksOpen(true)}
                    >
                      Complete All
                    </MenuItem>
                    <CompelteAllTasksModal
                      isOpen={isCompleteAllTasksOpen}
                      setIsOpen={setIsCompleteAllTasksOpen}
                      projectId={projectId}
                      projectDispatch={projectDispatch}
                      sectionTitle={title}
                    />
                    <MenuItem
                      icon={<MdOutlineEdit />}
                      onClick={() => setIsEditSectionOpen(true)}
                    >
                      Edit
                    </MenuItem>
                    <EditSectionModal
                      isOpen={isEditSectionOpen}
                      setIsOpen={setIsEditSectionOpen}
                      projectId={projectId}
                      projectDispatch={projectDispatch}
                      sectionTitle={title}
                    />
                    <MenuItem
                      icon={<MdOutlineDelete color="red" />}
                      onClick={() => setIsDeleteSectionOpen(true)}
                    >
                      Delete
                    </MenuItem>
                    <DeleteSectionModal
                      isOpen={isDeleteSectionOpen}
                      setIsOpen={setIsDeleteSectionOpen}
                      projectId={projectId}
                      projectDispatch={projectDispatch}
                      sectionTitle={title}
                    />
                  </Menu>
                </Box>
              </HStack>
              <Heading
                as="p"
                fontSize="14px"
                fontWeight="400"
                color="gray.400"
                py="2"
              >
                Task Done: {finishedTaskCount}/{tasks.length}
              </Heading>
              <Divider color="gray.300" mt="8" />
              <Droppable droppableId={title} type="task">
                {(provided, snapshot) => (
                  <Box
                    minH="80"
                    w="100%"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    bg={snapshot.isDraggingOver ? "gray.100" : "transparent"}
                    borderRadius="10"
                  >
                    {tasks.map((task: TaskType, taskIndex) => (
                      <Task
                        key={task.title + taskIndex}
                        task={task}
                        index={taskIndex}
                        projectDispatch={projectDispatch}
                      />
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </VStack>
          </Card>
        </Box>
      )}
    </Draggable>
  );
};

export default SectionItem;
