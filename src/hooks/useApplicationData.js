import { useReducer, useEffect } from "react";
import axios from "axios";
import { reducer, SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_SPOT } from "reducers/application"

export default function useApplicationData() {
  /**
   * Manages the application state
   */
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  /**
   * Sets the the current day into state
   * @param {*} day 
   */
  const setDay = (day) => {
    if(day !== state.day) {
      dispatch({
        type: SET_DAY,
        value: day
      });
    }
  };

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
        dispatch({
          type: SET_APPLICATION_DATA,
          value: all
        });
      });
    },
    []
  )
  
  const getDayIndex = date => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    return weekDays.indexOf(date);
  }

  /**
   * Books interview for appointment
   * @param {*appointment id} id 
   * @param {*interview object} interview 
   */
  const bookInterview = (id, interview) => {
    //Creates a new appointment object with updated interview information
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview, interviewer: interview.interviewer.id }
    };

    //copys current appointments array stored in state and updates
    // with newly created appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // debugger
    //console.log('IDDDDDDDDD', interview.interviewer.id)
    return axios
    .put(`/api/appointments/${id}`, {
      interview: {
        interviewer: interview.interviewer.id,
        student: interview.student
      }
    })
    .then(() => {
      if(!state.appointments[id].interview) {
        let tempDay = {...state};
        tempDay.days[getDayIndex(tempDay.day)].spots -= 1;
        dispatch({
          type: SET_SPOT,
          value: tempDay.days
        })
      }
      dispatch({
        type: SET_INTERVIEW, 
        value: appointments
      });
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
      dispatch({
        type: SET_INTERVIEW, 
        value: appointments
      });
      let tempDay = {...state}
      tempDay.days[getDayIndex(tempDay.day)].spots += 1
      dispatch({
        type: SET_SPOT,
        value: tempDay.days
      })
    })
  }

  return {state, setDay, bookInterview, cancelInterview}
}
