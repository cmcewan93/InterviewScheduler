import React, { Fragment } from 'react'

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";


export default function Appointment(props) {
//  console.log(props, ' @#$@#$@ ', props)
  console.log("appointments", {props})
  const appointment = props.interview 
  ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> 
  : <Empty />

  return (
    <Fragment>
      <Header time={props.time} />
      {appointment}
    </Fragment>
  );
}

