import React from "react";
import useApplicationData from "../hooks/useApplicationData"
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";
import "components/Application.scss";
import Header from "./Appointment/Header";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
 
  //get an array of appointments for a specific day
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersByDay(state, state.day)
  

  //map through the appointmentlist creating an appointment component for each
  const appointmentList = appointments.map((appointment) => {
    //console.log('this is being called @@@@@')
    //get interviewer info for that appointment interview
    const interview = getInterview(state, appointment.interview);
    //console.log(interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay}
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Header time="5pm" /> {/* FIX THIS, suppose to appointment component */} 
      </section>
    </main>
  );
}
