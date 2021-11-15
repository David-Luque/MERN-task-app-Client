import React, { useReducer } from 'react';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import { 
    PROJECT_TASKS,
    ADD_TASKS,
    VALIDATE_TASK,
    DELETE_TASK,
    UPDATE_TASK,
    SELECT_TASK,
    CLEAN_TASK
} from '../../types/index';
import axiosClient from '../../config/axios';


const TaskState = props => {
    
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null 
    }

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    //FUNCTIONS
    //obtain all project tasks
    const getTasks = async project => {
        try {
            const result = await axiosClient.get('/api/tasks', {params: { project }})
            //console.log(result)
            dispatch({
                type: PROJECT_TASKS,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    };

    //create a new task
    const createTask = async task => {
        //console.log(task)
        try {
            const result = await axiosClient.post('/api/tasks', task);
            console.log(result)
            dispatch({
                type: ADD_TASKS,
                payload: task
            });
            
        } catch (error) {
            
        }
    };

    //validate task an show error
    const validateTask = ()=>{
        dispatch({
            type: VALIDATE_TASK,
        });
    };

    //delete task
    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params: { project }});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

    //update completed task status
    const updateTask = async task => {
        console.log('TASK TO UPDATE: ', task)
        console.log('PATH: ', `/api/tasks/${task._id}`)
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
        dispatch({
            type: UPDATE_TASK,
            payload: result.data.task
        }); 
        } catch (error) {
            console.log(error);
        }
    };

    //select task to edit
    const selectTask = task => {
        dispatch({
            type: SELECT_TASK,
            payload: task
        });
    };

    //clean selectedTask
    const cleanTask = ()=>{
        dispatch({
            type: CLEAN_TASK
        });
    };


    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                createTask,
                validateTask,
                deleteTask,
                updateTask,
                selectTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;