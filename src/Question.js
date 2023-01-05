import React from 'react'
import { nanoid } from 'nanoid'

const Question = ({question, options,index,fillChoices}) => {

  // handleChange to use the event and get each value along with the id gotten when the radio is clicked to send it along in the fillChoices.
  function handleChange(event) {
    const {value,id} = event.target
    fillChoices(index,value,id)
  }

  // radio elements created using map which maps over each element and creates a label parent element containing a radio button along with a span to show the name and hide the radio to remove the circle.
  const radioElements = options.map((opt) => {
    return (
      <label className='answer' key={nanoid()}>
        <input type="radio" name={question} id={nanoid()} value={opt} onChange={handleChange} hidden/>
        <span>{opt}</span>
      </label>
    )
  })
    
  return (
      <div className='question--container'>
        <h4 className='question'>{question}</h4>
        <div className='answers'>
          {radioElements}
        </div>
        <hr/>
    </div>
  )
}


export default Question