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
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    //Take appointment id and interview information
    props.bookInterview(props.id, interview)
    .then(() => {
      try {
        transition(SHOW);
      } catch(err){
        transition(ERROR_SAVE, true)
      }
    }).catch(error => {
      transition(ERROR_SAVE, true)
    })
  }

  const onEdit = () => {
    transition(EDIT)
  }
  
  const onDelete = () => {
    transition(CONFIRM);
  }

  const confirmDelete = () => {
    transition(DELETING, true);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    }).catch(error => {
      transition(ERROR_DELETE, true);
    })
  }

  //dereferences object vals
  const { mode, transition, back } = useVisualMode(
    //passes initial mode using ternary
    props.interview ? SHOW : EMPTY
  );
  return (
    <Fragment>
      <article data-testid="appointment"></article>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} 
        />
      )}
      {mode === EDIT && (
        <Form 
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"}/> }
      {mode === DELETING && <Status message={"Deleting"}/>}
      {mode === CONFIRM &&
        <Confirm
          message={"Are you sure you would like to delete?"}
          onConfirm={confirmDelete}
          onCancel={back}
        />
      }
      {mode === ERROR_SAVE && <Error message={"Could not save appointment"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Could not delete appointment"} onClose={back} />}
    </Fragment>
  );
}

