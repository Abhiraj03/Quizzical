import React from 'react'
import Question from './Question'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const Quiz = ({questions}) => {
  // parser to handle special characters such as - ' "" ? > < etc
  const parser = new DOMParser()
  // choices to store the values chosen by the user by pressing the radio buttons and store in array
  const [choices, setChoices] = React.useState([])
  // answers is an array which just stores all the correct_answer of all the questions
  const answers = questions.map(ques => ques.correct_answer)
  // correct stores the values of answers correct by the user
  const [correct, setCorrect] = React.useState(-1)
  // questionsElement is collection of JSX elements containing question component
  const [questionsElements, setQuestionElements] = React.useState(questionElements())
  // values contain the id's of each of the chosen choices needed to update the styles later on after checking answers
  const [values, setValues] = React.useState([])

  function questionElements() {
    // mapping over each questions and getting each question object along with the index
    return questions.map((ques,index) => {
      // push the correct answer as its seperate from all the options
      ques.incorrect_answers.push(ques.correct_answer)
      // need this to handle the special characters using built in parser
      const options = ques.incorrect_answers.map(ans => parser.parseFromString(`<!doctype html><body>${ans}`, 'text/html').body.textContent)
      // using this to shuffle all the options to mix the correct answer
      const shuffled = options.sort((a,b) => 0.5 - Math.random())
      // same thing for questions
      const parsedQuestion = parser.parseFromString(`<!doctype html><body>${ques.question}`, 'text/html').body.textContent
      
      // returning question component with the paresed question shuffed options and a function fillChoices to get the answers back from the each Question compoennt index to put the returned chosen answers by user in correct index of array
      return <Question key={nanoid()} question={parsedQuestion} options={shuffled} fillChoices={fillChoices} index={index} />
    })
  }

  // simple function. gets the data back from the question by calling this function with paramenters. set the choices and values with values and id getten back from question components in correct index to compare them later for checking
  function fillChoices(index,value,id) {
    setChoices(oldChoices => {
      const arr = oldChoices
      arr[index] = value
      return arr
    })
    setValues(oldValues => {
      const arr = oldValues
      arr[index] = id
      return arr
    })
  }
  
  // sets correct to 0 to remove the -1. then checks if user have even selected anything by counting the number of chosen values. could have been done using choices as both are same element. Then loops over 5 questions and call the parent of each radio button which was the label using the values aka the id's of each radio button. Then checks if each answer guessed are equal to the correct answers array if yes change the style using the element if not change it to red color
  function checkAnswer() {
    setCorrect(0)
    if(values.length)
    {
      for(let i = 0 ; i < 5 ; i++)
      {
        let element = document.getElementById(values[i]).parentElement
  
        if(choices[i] === answers[i]){
          setCorrect(old => old + 1)
          element.style.border = "none"
          element.style.backgroundColor = "#94D7A2"
        }
        else {
          element.style.border = "none"
          element.style.backgroundColor = "#F8BCBC"
        }
      }
    }
  }

  // refresed the whole window
  function playAgain() {
    window.location.reload(false);
  }

  // if all correct display confetti. display all questions with buttons. only display the score if correct is not -1 which meant user either didnt choose anything or all wrong. button with 2 onclick functions for each use.
  return (
    <>
      {correct === 5 && <Confetti height="700px"/>}
      {questionsElements}
      <div className='correct'>
        {correct !== -1 && <h3>{`You scored ${correct}/5 correct answers`}</h3>}
        <button type='button' className='check' onClick={correct !== -1 ? playAgain:checkAnswer}>{correct !== -1 ? "Play again" : "Check answers"}</button>
      </div>
    </>
  )
}
export default Quiz