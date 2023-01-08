import {
  TransformedSection as SectionType,
  Project as ProjectType,
  ProjectActionKind,
  ProjectAction,
  TaskStateEnum,
} from "src/models/GlobalModules/index";

const projectReducer = (state: ProjectType, action: ProjectAction) => {
  const { type, payload } = action;
  switch (type) {
    case ProjectActionKind.loadProject: {
      return payload;
    }

    case ProjectActionKind.editProject: {
      const { title, members } = payload;
      return { ...state, title, members };
    }

    case ProjectActionKind.addSection: {
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      columns.push({ title: payload.title, tasks: [] });
      return { ...state, columns };
    }

    case ProjectActionKind.editSection: {
      const columnIndex = state.columns.findIndex(
        (column) => column.title === payload.currentTitle
      );
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));

      columns[columnIndex].title = payload.newTitle;
      columns[columnIndex].tasks.forEach(
        (task) => (task.columnTitle = payload.newTitle)
      );

      return { ...state, columns };
    }

    case ProjectActionKind.deleteSection: {
      let columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      columns = columns.filter((column) => column.title !== payload.title);
      return { ...state, columns };
    }

    case ProjectActionKind.reorderSections: {
      let columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const [draggableColumn] = columns.splice(payload.source.index, 1);
      columns.splice(payload.destination.index, 0, draggableColumn);
      return { ...state, columns };
    }

    case ProjectActionKind.addTask: {
      const columnIndex = state.columns.findIndex(
        (column) => column.title === payload.columnTitle
      );
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const selectedColumn = columns[columnIndex];

      selectedColumn?.tasks.push(payload);
      return { ...state, columns };
    }

    case ProjectActionKind.editTask: {
      const columnIndex = state.columns.findIndex(
        (column) => column.title === payload.columnTitle
      );
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const selectedColumn = columns[columnIndex];

      let currentTaskIndex = selectedColumn.tasks.findIndex(
        (task) => task._id === payload.updatedTask._id
      );

      selectedColumn.tasks[currentTaskIndex] = payload.updatedTask;
      return { ...state, columns };
    }

    case ProjectActionKind.deleteTask: {
      const columnIndex = state.columns.findIndex(
        (column) => column.title === payload.columnTitle
      );
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const selectedColumn = columns[columnIndex];

      selectedColumn.tasks = selectedColumn.tasks.filter(
        (task) => task._id !== payload.taskId
      );

      return { ...state, columns };
    }

    case ProjectActionKind.completeAllTasks: {
      const columnIndex = state.columns.findIndex(
        (column) => column.title === payload.columnTitle
      );
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const selectedColumn = columns[columnIndex];

      selectedColumn.tasks.forEach((task) => (task.state = TaskStateEnum.done));
      return { ...state, columns };
    }

    case ProjectActionKind.reorderTasks: {
      let draggedTask: any;
      const columns: SectionType[] = JSON.parse(JSON.stringify(state.columns));
      const startColumn = columns.find(
        (column) => column.title === payload.source.droppableId
      );

      const finishColumn = columns.find(
        (column) => column.title === payload.destination.droppableId
      );

      if (startColumn) {
        startColumn.tasks = startColumn.tasks.filter((task) => {
          if (task._id === payload.draggableId) draggedTask = task;
          if (task.position > payload.source.index) task.position--;
          return task._id !== payload.draggableId;
        });
      }

      if (finishColumn) {
        draggedTask.columnTitle = finishColumn.title;
        draggedTask.position = payload.destination.index;
        finishColumn.tasks.forEach((task) => {
          if (task.position >= payload.destination.index) task.position++;
        });
        finishColumn.tasks.push(draggedTask);
        finishColumn.tasks.sort(
          (firstTask, secondTask) => firstTask.position - secondTask.position
        );
      }

      return { ...state, columns };
    }

    default:
      return state;
  }
};

export default projectReducer;
