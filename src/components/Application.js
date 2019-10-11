import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersByDay } from "helpers/selectors";
import "components/Application.scss";
import Header from "./Appointment/Header";

export default function Application(props) {
  //component state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => {
    if (day !== state.day) {
      setState(prev => ({ ...prev, day }));
    }
  };

  const bookInterview = (id, interview) => {
    //Creates a new appointment object with updated interview information
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //copys current appointments array stored in state and updates
    // with newly created appointment
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments});
    
    return axios
    .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(response => {
      setState({ ...state, appointments});
      //console.log(response)
      })
      .catch(error => {
        console.error(error);
      })
  }

  // Retrieves state data from api
  // Every time component changes does another axios call
  useEffect(() => {
    Promise.all([
      Promise.resolve(
        axios
          .get("/api/appointments")
        ),
      Promise.resolve(
        axios
          .get("/api/days")
        ),
      Promise.resolve(
        axios
          .get("/api/interviewers")
      ),
      ]).then((all) => {
        setState({
          ...state,
          appointments: all[0].data,
          days: all[1].data,
          interviewers: all[2].data
        })
      });
    },
    [state.day]
  )
 
  
  //get an array of appointments for a specific day
  const appointments = getAppointmentsForDay(state, state.day)
  const interviewers = getInterviewersByDay(state, state.day)
  

  //map through the appointmentlist creating an appointment component for each
  const appointmentList = appointments.map((appointment) => {
    //get interviewer info for that appointment interview
    const interview = getInterview(state, appointment.interview);
    // console.log("######", interview)
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
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
