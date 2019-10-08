

const getAppointmentsForDay = (state, day) => {
  let filteredDay = state.days.filter(item => item.name === day);
  // //filteredDay = filteredDay[0].appointments;
  // console.log(filteredDay);
  // //console.log('@@@@@@@@@@@@@', filteredDay[0].appointments);
  // //console.log('!!!!!!!!!!!!!!!!', state.appointments)
  
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

module.exports = { getAppointmentsForDay };