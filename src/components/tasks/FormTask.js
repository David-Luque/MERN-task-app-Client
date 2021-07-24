import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {
    //project context
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    //task context
    const tasksContext = useContext(taskContext);
    const { selectedTask, taskError, getTasks, createTask, validateTask, updateTask, cleanTask } = tasksContext;

    //effect to detect if there is a selected task
    useEffect(()=>{
        if(selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: '' 
            })
        }

    }, [selectedTask]);


    //local component state
    const [task, setTask] = useState({
        name: ''
    });
    const { name } = task;

    //conditional rendering
    if(!project) return null;

    //getting actual project from array of "project" state from context"
    const [ actualProject ] = project;


    const handleChange = e => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();

        //validate
        if(name.trim() === '') {
            validateTask();
            return;
        }

        //check if editing or creating task
        if(selectedTask === null) {
            //create new task
            task.project = actualProject._id;
            createTask(task);            
        } else {
            //edit existing task
            updateTask(task);
            //clean task from state
            cleanTask();
        }

        //obtain updated tasks from actual project
        getTasks(actualProject._id)

        //restart form
        setTask({
            name: ''
        });
    };


    return (
        <div className="form">
            <form
                onSubmit={handleSubmit}
            >
                <div className="container-input">
                    <input
                        type="text"
                        className="input-text"
                        name="name"
                        placeholder="Write task here"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="container-input">
                    <input
                        type="submit"
                        className="btn btn-primary btn-submit btn-block"
                        value={selectedTask ? 'Edit task' : 'Add task'}
                    />
                </div>
            </form>

            { taskError ? <p className="message error">Task name is required</p> : null }

        </div>
        
    );
}
 
export default FormTask;