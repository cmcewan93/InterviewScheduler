import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
//console.log('PROPSSSS', props);

//console.log('DAYSSSSSSS', props.days)

const items = props.days.map((item) => {
    //console.log(item.name, ' vssss ', props.day)
    //console.log(item.name, ' has this many ', item.spots)
    return <DayListItem 
    key={item.id}
    name={item.name}
    spots={item.spots}
    selected={item.name === props.day}
    setDay={props.setDay}
  />
  
  
})
//console.log('ITEMS', items)

  return (
    <ul>
      {items}
    </ul>
  );

}