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

    if(!project) return <h2 data-cy="select-title">Select any project</h2>;

    const [ actualProject ] = project;
    
    // const renderTasks = ()=>{
    //     if(projectTasks.length === 0) {
    //         return (
    //             <p> No pending tasks </p>
    //         );
    //     } else {
    //         return (
    //             <ul className="list-tasks">
    //                 <TransitionGroup>
    //                     {projectTasks.map((task, index) => (
    //                         <CSSTransition 
    //                             key={index}
    //                             timeout={200}
    //                             classNames="task"
    //                         >
    //                             <Task {...task}/>
    //                         </CSSTransition>
    //                     ))}
    //                 </TransitionGroup>
    //             </ul> 
    //         );
    //     }
    // };


    return (
        <Fragment>
            <h2>Project: {actualProject.name}</h2>
            <ul className="list-tasks">
                {projectTasks.length === 0
                    ? (<li className="task"> <p>No pending tasks</p> </li>)
                    : <TransitionGroup>
                        {projectTasks.map((task, index) => (
                            <CSSTransition 
                                key={index}
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
                onClick={() => deleteProject(actualProject._id)}
            >
                Delete project &times;
            </button>
        </Fragment>
        
    );
}
 
export default ListTask;