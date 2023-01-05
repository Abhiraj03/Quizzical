import React from 'react'

const Home = ({start, selected, setSelected}) => {
  // handleChange to update the selected state from the App component using event.target
  function handleChange(event) {
    const {value,name} = event.target
    setSelected(oldSelect =>{
      return {
        ...oldSelect,
        // this [name] adds new object components depending on the name string
        [name]: value
      }
    })
  }
      
  return (
    <div className='main--home'>
        <h1>Quizzical</h1>
        <p>Test your general knowledge<br/> with easy questions</p>
        <h3>Choose a Category</h3>

        {/* each select need is an id to either link with a label or use to CSS, value is needed to update the value shown in the select rather than getting value back from the select. First sends the value clicked from the select back to the state and then use state to display it on the select. onChange to handle each change. name to make it easier to creat object values as shown above in handleChange function */}
        <select 
          id="category"
          value={selected.category} 
          onChange={handleChange}
          name="category"
        >
          <option value="9">General knowledge</option>
          <option value="11">Film</option>
          <option value="15">Video Games</option>
          <option value="18">Computers</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
        </select>

        <select 
          id="difficulty"
          value={selected.difficulty} 
          onChange={handleChange}
          name="difficulty"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {/* start is already given as a callback function so when click that function which is in app component is clicked */}
        <button onClick={start}>Start quiz</button>
    </div>
  )
}

export default Home