import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  /**
   * Manages the application state
   */
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /**
   * Retrieves state data from api
   * Every time component changes does another axios call
   * */
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

  /**
   * Books interview for appointment
   * @param {*appointment id} id 
   * @param {*interview object} interview 
   */
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
    return axios
    .put(`/api/appointments/${id}`, {
      interview: interview
    })
    .then(() => {
      setState({ ...state, appointments});
    })
  }

  /**
   * Deletes the interview appointment for that timeslot
   * @param {*} id  respresents the appointment id
   */
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    return axios
    .delete(`/api/appointments/${id}`, {})
    .then(response => {
      setState({ ...state, appointments});
    })
  }
  /**
   * Sets the the current day into state
   * @param {*} day 
   */
  const setDay = day => {
    if (day !== state.day) {
      setState(prev => ({ ...prev, day }));
    }
  };

  return {state, setDay, bookInterview, cancelInterview}
}
