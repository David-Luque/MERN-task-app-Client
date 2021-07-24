import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';

const Task = ({ taskInfo }) => {

    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, updateTask, selectTask } = tasksContext;

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const [ actualProject ] = project;

    
    const removeTask = id => {
        deleteTask(id, actualProject._id)
        getTasks(actualProject.id)
    };

    const changeTaskState = task => {
        task.isCompleted = !task.isCompleted;
        // if(task.isCompleted === false) {
        //     task.isCompleted = true
        // } else {
        //     task.isCompleted = false
        // }
        updateTask(task);
    };

    const addTaskToEdit = task => {
        selectTask(task)
    };


    return (
        <li className="task shadow">
            <p>{taskInfo.name}</p>

            <div className="status">
                {taskInfo.isCompleted
                    ? (
                        <button
                            type="button"
                            className="complete"
                            onClick={()=>{changeTaskState(taskInfo)}}
                        >
                            Complete
                        </button>
                    )
                    : (
                        <button
                            type="button"
                            className="incomplete"
                            onClick={()=>{changeTaskState(taskInfo)}}
                        >
                            Incomplete
                        </button>
                    )
                }
            </div>
            <div className="actions">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {addTaskToEdit(taskInfo)}}
                >
                    Edit
                </button>
                
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => removeTask(taskInfo._id)}
                >
                    Delete
                </button>
            </div>
        </li>
    );
}
 
export default Task;