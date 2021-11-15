import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AlertContext from '../../context/alerts/alertContext';

const ProjectList = () => {

    //extract projects from initial state
    const projectsContext = useContext(projectContext);
    const { projects, message, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    //obtain projects when component loads
    useEffect(() => {
        //if error
        if(message) {
            showAlert(message.msg, message.category)
        }
        
        getProjects();
        //eslint-disable-next-line
    }, [message])

    //check in "projects" has content
    if(projects.length === 0) return <p>No projects. Create the first one</p>;

    return (
        <ul data-cy="projects-list" className="list-projects">

            {alert ? (
                <div className={`alert ${alert.category}`}> {alert.msg} </div>
            ) : null}

            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition 
                        key={project._id} 
                        timeout={200} 
                        classNames="project"
                    >
                        <Project projectInfo={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
            
        </ul>
    );
}
 
export default ProjectList;