import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({ projectInfo }) => {
    //obtain projects context functions and state
    const projectsContext = useContext(ProjectContext);
    const { getActualProject } = projectsContext;

    //obtain task context functions and state
    const tasksContext = useContext(taskContext)
    const { getTasks } = tasksContext;

    //funtion to aggregate actual project and their tasks
    const selectProject = id => {
        getActualProject(id)  // set actual project
        getTasks(id)          // filter project tasks when user clicks
    };


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={()=>{selectProject(projectInfo._id)}}
            >
                {projectInfo.name}
            </button>
        </li>
    );
}
 
export default Project;