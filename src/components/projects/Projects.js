import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTask from '../tasks/ListTask';
import AuthContext from '../../context/autentication/authContext';

const Projects = () => {

    //extract authentication info
    const authContext = useContext(AuthContext);
    const { authenticateUser } = authContext;

    useEffect(()=>{
        authenticateUser();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="container-app">
            
            <Sidebar />

            <div className="main-section">
                <Header/>

                <main>
                    <FormTask/>

                    <div className="container-tasks">
                        <ListTask/>
                    </div>
                </main>
            </div>
        </div>
    );
}
 
export default Projects;