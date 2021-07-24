import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
    NEW_PROJECT_FORM, 
    OBTAIN_PROJECTS,
    ADD_PROJECT,
    PROJECT_ERROR,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT
} from '../../types/index';
import axiosClient from '../../config/axios';



const ProjectState = props => {

    const initialState = {
        projects: [],
        form : false,
        formError: false,
        project: null,
        message: null
    }

    //dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState)

    //funtions to CRUD actions
    const showForm = ()=>{
        dispatch({
            type: NEW_PROJECT_FORM
        })
    };

    //obtain projects
    const getProjects = async () => {
        try {

            const results = await axiosClient.get('/api/projects')

            dispatch({
                type: OBTAIN_PROJECTS,
                payload: results.data.projects
            })
        } catch (error) {
            console.log(error);

            const alert = {
                msg: 'There was an error',
                category: 'alert-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    //add project
    const addProject = async project => {
        try {
            const result = await axiosClient.post('/api/projects', project);
            //console.log(result)
            //insert project in state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            });
        } catch (error) { 
            console.log(error);

            const alert = {
                msg: 'There was an error',
                category: 'alert-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    //validate form errors
    const showError = ()=>{
        dispatch({
            type: VALIDATE_FORM
        });
    };

    //select the project choosen by user
    const getActualProject = project => {
        dispatch({
            type: ACTUAL_PROJECT,
            payload: project
        })
    };

    //delete any project
    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            console.log(error);

            const alert = {
                msg: 'There was an error',
                category: 'alert-error'
            };

            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    }



    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                getActualProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
};

export default ProjectState;