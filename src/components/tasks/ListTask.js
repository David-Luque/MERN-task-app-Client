import React, { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTask = () => {

    //obtain project from initial state
    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    //obtain project tasks
    const tasksContext = useContext(taskContext);
    const { projectTasks } = tasksContext;

    if(!project) return <h2>Select any project</h2>;

    const [ actualProject ] = project;


    const deleteCurrentProject = ()=>{
        deleteProject(actualProject._id)
    };
    

    return (
        <Fragment>
            <h2>Project: {actualProject.name}</h2>
            <ul className="list-tasks">
                {projectTasks.length === 0
                    ? (<li className="task"> <p>No pending tasks</p> </li>)
                    : <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition 
                                key={task.id}
                                timeout={200}
                                classNames="task"
                            >
                                <Task taskInfo={task}/>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button
                type="button"
                className="btn btn-delete"
                onClick={deleteCurrentProject}
            >
                Delete project &times;
            </button>
        </Fragment>
        
    );
}
 
export default ListTask;