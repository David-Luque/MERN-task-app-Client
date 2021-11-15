import React from 'react';

const Alert = ({ alert }) => {
    if(!alert) return null;
    
    return (
        <div 
            data-cy="alert"
            className={`alert ${alert.category}`}
        > {alert.msg} </div>
    )
    
}
 
export default Alert;