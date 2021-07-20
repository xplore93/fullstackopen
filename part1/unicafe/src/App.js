import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Buttons = ({ handleClicks, text }) =>
  handleClicks.map((element, index) => (
    <Button key={index} handleClick={element} text={text[index]} />
  ))

const Statistic = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const Statistics = ({ text, values }) => {
  const all = values.reduce((a, b) => a + b)
  const divideBy = all || 1
  const avg = (values[0] - values[2]) / divideBy
  const positive = (100 / divideBy) * values[0]

  return (
    <>
      {all ? (
        <>
          {text.map((element, index) => (
            <Statistic key={index} text={element} value={values[index]} />
          ))}
          <Statistic text={'all'} value={all} />
          <Statistic text={'average'} value={avg} />
          <Statistic text={'positive'} value={`${positive} %`} />
        </>
      ) : (
        <Statistic text={'No feedback given'} />
      )}
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const text = ['good', 'neutral', 'bad']

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text={'give feedback'} />
      <Buttons
        handleClicks={[handleGoodClick, handleNeutralClick, handleBadClick]}
        text={text}
      />
      <Header text={'statistics'} />
      <Statistics text={text} values={[good, neutral, bad]} />
    </div>
  )
}

export default App
