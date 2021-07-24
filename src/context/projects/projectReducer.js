import { 
    ADD_PROJECT,
    PROJECT_ERROR,
    NEW_PROJECT_FORM,
    OBTAIN_PROJECTS,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT
} from '../../types/index';

export default (state, action) => {
    switch(action.type) {
        case NEW_PROJECT_FORM:
            return {
                ...state,
                form: true
            }
        
        case OBTAIN_PROJECTS:
            console.log(action.payload)
        return {
            ...state,
            projects: action.payload
        }

        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload],
                form: false,
                formError: false
            }

        case VALIDATE_FORM:
            return {
                ...state,
                formError: true
            }

        case ACTUAL_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload)
            }

        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project._id !== action.payload),
                project: null
            }
        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload
            }

        default:
            return state;
    }
}