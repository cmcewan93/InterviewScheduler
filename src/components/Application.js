import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import "components/Application.scss";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
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
          ]).then((all) => {
            console.log(all[0].data)
            setState({
              ...state,
              appointments: all[0].data,
              days: all[1].data,
            })
          });

  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));
  //const setDays = days => setState(prev => ({ ...prev, days }));

  const appointments = getAppointmentsForDay(state, state.day)
  const appointmentList = appointments.map((appointment) => {
    return (<Appointment
     key={appointment.id} {...appointment}/>
    )
  })

  console.log("!@#!@#!@#!@", state.day)

  
  

  // useEffect(() => {
  //   axios
  //     .get("/api/days")
  //     .then((response) => {
  //       setDays(response.data)
  //     })
  // }, [])

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
