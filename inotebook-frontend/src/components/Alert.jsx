import React from "react";

const Alert = (props) => {
  return (
      <div className='alert alert-primary' style={{marginTop: '55px'}} role='alert'>
        {props.message}
      </div>
  );
};

export default Alert;
