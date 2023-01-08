import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { VStack, Heading, HStack, Badge, MenuItem } from "@chakra-ui/react";
import moment from "moment";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

import Menu from "src/components/Menu/Menu";
import DeleteTaskModal from "src/pages/Authed/Project/modals/deleteTaskModal/DeleteTaskModal";

import { Task as TaskType } from "src/models/GlobalModules";
import { stateBadgeColor } from "src/_helpers/_utils";
import EditTaskModal from "./../modals/editTaskModal/EditTaskModal";

const Task: React.FC<{
  task: TaskType;
  projectDispatch: any;
  index: number;
}> = (props) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState<boolean>(false);
  const [isDeleteTaskOpen, setIsDeleteTaskOpen] = useState<boolean>(false);

  const {
    task: { title, state, to, from, _id, columnTitle },
    projectDispatch,
    index,
  } = props;
  return (
    <Draggable draggableId={_id} index={index}>
      {(provided, snapshot) => (
        <VStack
          w="100%"
          align="flex-start"
          bg={snapshot.isDragging ? "gray.200" : "gray.50"}
          p="4"
          mb="4"
          borderRadius="10"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <HStack justify="space-between" w="100%">
            <Heading as="p" fontSize="14px">
              {title}
            </Heading>
            <Menu btnColor="black" opacityOnHover={0.5} rotate={true}>
              <MenuItem
                icon={<MdOutlineEdit />}
                onClick={() => setIsEditTaskOpen(true)}
              >
                Edit
              </MenuItem>
              <EditTaskModal
                isOpen={isEditTaskOpen}
                setIsOpen={setIsEditTaskOpen}
                projectDispatch={projectDispatch}
                task={props.task}
                sectionTitle={columnTitle}
              />
              <MenuItem
                icon={<MdOutlineDelete color="red" />}
                onClick={() => setIsDeleteTaskOpen(true)}
              >
                Delete
              </MenuItem>
              <DeleteTaskModal
                isOpen={isDeleteTaskOpen}
                setIsOpen={setIsDeleteTaskOpen}
                taskId={_id}
                taskTitle={title}
                sectionTitle={columnTitle}
                projectDispatch={projectDispatch}
              />
            </Menu>
          </HStack>
          <HStack justify="space-between" w="100%">
            <Badge
              borderRadius="12"
              py="6px"
              px="2"
              colorScheme={stateBadgeColor(state)}
            >
              {state}
            </Badge>
            <Heading as="p" fontSize="12px" color="gray.500">
              {moment(to).format("MMM D")}
            </Heading>
          </HStack>
        </VStack>
      )}
    </Draggable>
  );
};

export default Task;
