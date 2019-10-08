import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {
  //component state
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  //Retrieves state data from api
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
          console.log("@@@@@@", all)
          setState({
            ...state,
            appointments: all[0].data,
            days: all[1].data,
            interviewers: all[2].data
          })
        });
  }, [state.day])
 
  const setDay = day => setState(prev => ({ ...prev, day }));
 
  //get an array of appointments for a specific day
  const appointments = getAppointmentsForDay(state, state.day)

  //map through the appointmentlist creating an appointment component for each
  const appointmentList = appointments.map((appointment) => {
    //get interviewer info for that appointment interview
    console.log({appointment})
    const interview = getInterview(state, appointment.interview);
    return (<Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}/>
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
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
