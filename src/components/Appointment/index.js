import React, { Fragment } from 'react'

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

   //ERRORS
   const ERROR_SAVE = "ERROR_SAVE";
   const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const save = (name, interviewer) => {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };
    //Take appointment id and interview information
    props.bookInterview(props.id, interview)
    .then(() => {
      // console.log(response)
      transition(SHOW);
    }).catch(error => {
      console.log(error)
    })
  }
  
  
  //dereferences object vals
  const { mode, transition, back } = useVisualMode(
    //passes initial mode using ternary
    props.interview ? SHOW : EMPTY
  );
  return (
    <Fragment>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/> }
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} 
        />
      )}
    </Fragment>
  );
}

