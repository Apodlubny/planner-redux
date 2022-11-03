import { combineReducers } from "redux";
import { statusFilters } from "./constants";

const tasksInitialState = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

const tasksReducer = (state = tasksInitialState, { type, payload }) => {
  switch (type) {
    case "tasks/addTask":
      return [...state, payload];
    case "tasks/deleteTask":
      return state.filter(task => task.id !== payload);
    case "tasks/toggleCompleted":
      return state.map(task => {
        if (task.id !== payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    case "tasks/SelectAll":
      return state.map(task => {
        if (payload) {
          return task.completed
            ? task
            : {
                ...task,
                completed: true,
              };
        }

        return !task.completed
          ? task
          : {
              ...task,
              completed: false,
            };
      });

    default:
      return state;
  }
};

const filtersInitialState = {
  status: statusFilters.all,
};

const filtersReducer = (state = filtersInitialState, action) => {
  switch (action.type) {
    case "filters/setStatusFilter":
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
});
