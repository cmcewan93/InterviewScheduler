

const getAppointmentsForDay = (state, day) => {
  let filteredDay = state.days.filter(item => item.name === day);

  //If state array is less than 0
  if(filteredDay.length <= 0) {
    return []
  } else {
    filteredDay = filteredDay[0].appointments;
    //returns array of appointments for that specific day using id key
    return filteredDay.map((day) => {
      return state.appointments[day];
    })
  }
}

//get interviewer for interview
const getInterview = (state, interview) => {
  console.log("I'm being called in get interview", {interview})

  if (interview) {
    // assigns value from the state interviewers list using the
    // interviewer id passed in interview object
    const interviewer = state.interviewers[interview.interviewer];
    interview.interviewer = interviewer;
  
    return interview;
  } else return null;
}
module.exports = { getAppointmentsForDay, getInterview };