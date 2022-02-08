import React, { Fragment, useContext, useState } from 'react';
import ProjectContext from '../../context/projects/projectContext';

const NewProject = () => {

    //obtain form state
    const projectsContext = useContext(ProjectContext);
    const { form, formError, showForm, addProject, showError } = projectsContext


    const [project, setProject] = useState({
        name: ''
    });
    const { name } = project;

 
    const handleChange = e => {
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]: value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        //validate
        if(name.trim() === '') {
            showError();
            return;
        }

        //aggregate to state
        addProject(project)

        //restart form
        setProject({
            name: ''
        })
    };


    return (
        <Fragment>
            <button
                data-cy="btn-new-project"
                type="button"
                className="btn btn-block btn-primary"
                onClick={()=> {showForm()}}
            >
                New project
            </button>

            { form ? (
                <form
                    className="form-new-project"
                    onSubmit={handleSubmit}
                >
                    <input
                        data-cy="input-new-project"
                        type="text"
                        name="name"
                        className="input-text"
                        placeholder="Project name"
                        value={name}
                        onChange={handleChange}
                    />
                    
                    <input
                        data-cy="submit-new-project"
                        type="submit"
                        className="btn btn-block btn-primary"
                        value="Add project"
                    />
                </form>
            ) : null }

            { formError ? (
                <p data-cy="alert" className="message error"> You must provide a project name </p>
                ) : null
            }
        </Fragment>  
    );
}
 
export default NewProject;