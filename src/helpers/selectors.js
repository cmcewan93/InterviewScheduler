

export const getAppointmentsForDay = (state, day) => {
  let filteredDay = state.days.find(item => item.name === day);

  //If state array is less than 0
  if (filteredDay) {
    //returns array of appointments for that specific day using id key
    return filteredDay.appointments.map(appointmentId => {
      return state.appointments[appointmentId]
    })
  }

  return [];
}

//get interviewer for interview
export const getInterview = (state, interview) => {
  if (interview) {
    // assigns value from the state interviewers list using the
    // interviewer id passed in interview object
    const interviewer = state.interviewers[interview.interviewer];
  
    return {...interview, interviewer};
  } else {
    return null
  };
}

export const getInterviewersByDay = (state, day) => {
  const interviewersOnDay = []

  //filters days array returning the specific day object
  const currentDay = state.days.find(item => item.name === day);
  
  if (currentDay) {
    /*
    loops through the current interviewers id array, using id as the 
    key reference to interviewers state, when match is found pushed to
    interviewers array.
    */
    currentDay.interviewers.forEach((index, val) => {
      interviewersOnDay.push(state.interviewers[index])
    })
  }
  return interviewersOnDay;
}


