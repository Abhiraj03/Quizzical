import React from "react";
import "./index.css"
import Quiz from "./Quiz"
import Home from "./Home"
import blob1 from "./blobs.png"
import blob2 from "./blobs-1.png"

export default function App() {
  // startQuiz to conditionally render either the home page or the quiz page
  const [startQuiz, setStartQuiz] = React.useState(false)
  // questions to store the quiz objects in an array using the API
  const [questions, setQuestions] = React.useState([])
  // selected to store the category and difficulty by passing it to the Home component and using the state there to get values from the select component in the home page as an object
  const [selected, setSelected] = React.useState({
    category: "9",
    difficulty: "easy"
  })
  
  // styles for each blobs and container depending if the quiz is started or not
  const blob1Styles = {
    left: startQuiz?"-30%":"-20%",
    bottom: startQuiz?"-30%":"-20%"
  }  
  
  const blob2Styles = {
    top: startQuiz?"-30%":"-20%",
    right: startQuiz?"-30%":"-20%"
  }  

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  //useEffect to handle the side effecct of calling the API and only refresing after the selected state is changed
  React.useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&category=${selected.category}&difficulty=${selected.difficulty}&type=multiple`)
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  },[selected])

  return (
    <div className="app">
      <div className='container--home' style={startQuiz ? null : containerStyles}>
        <img className="blob1" src={blob1} style={blob1Styles} alt="blob"/>
        <img className="blob2" src={blob2} style={blob2Styles} alt="blob"/>
        {startQuiz ? <Quiz questions={questions}/> : <Home selected={selected} setSelected={setSelected} start={() => setStartQuiz(true)}/>}
      </div>
    </div>
  )
}