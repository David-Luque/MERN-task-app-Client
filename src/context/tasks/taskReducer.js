import {
    PROJECT_TASKS,
    ADD_TASKS,
    VALIDATE_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    SELECT_TASK,
    CLEAN_TASK
} from '../../types/index';

const TaskReducer = (state, action) => {
     switch(action.type) {
        case PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TASKS:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                taskError: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                taskError: true
            }
        case DELETE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        case UPDATE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case SELECT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null
            }

        default:
             return state;
     }
};

export default TaskReducer;