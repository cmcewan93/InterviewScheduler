import React from "react";
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"
import PropTypes from "prop-types"

export default function InterviewList(props) {
  const interviewers = props.interviewers.map((interviewer) => {
  
    return (
      <InterviewerListItem
        avatar={interviewer.avatar}
        key={interviewer.id}
        interviewId = {interviewer.id}
        name={interviewer.name}
        setInterviewer={ event => props.setInterviewer(interviewer.id)}
        selected={interviewer.id === props.interviewer}
      
      />
    )
  })

return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {interviewers}
    </ul>
  </section>
  );
}

InterviewList.propTypes = {
  value: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
}