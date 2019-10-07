import React, { Fragment } from 'react'

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import "./styles.scss";


  export default function Appointment(props) {
   

    return (
      <Header time= {props.time}>
        { props.interview 
        ? <Show />
        : <Empty />
        } 
      </Header>
     
    
    );
  }

