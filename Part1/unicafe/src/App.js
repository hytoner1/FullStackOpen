import React, {useState} from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // #region Button

  const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick}>
          {text}
        </button>
    )
  }

  // #endregion Button

  // #region Statistics

  const StatisticsHeader = () => {return (<h2> Statistics</h2>)}

  const StatisticsLine = ({text, value, unit = ''}) => {
    return (
      <div>
        {text} {value} {unit}
      </div>
    )
  }

  function Avg(g, n, b) {
    const sum = g + n + b
    if (sum === 0) {
      return 0
    }

    return (g - b) / sum
  }

  const Statistics = (props) => {
    console.log('Statistics:', props)
    const {good, neutral, bad} = props

    const sum = good + neutral + bad

    if (sum === 0) {
      return (
        <div>
          <StatisticsHeader />
          <p>
            No feedback given
          </p>
        </div>
      )
    }

    return (
      <div>
        <StatisticsHeader />

        <StatisticsLine text='Good' value={good} />
        <StatisticsLine text='Neutral' value={neutral} />
        <StatisticsLine text='Bad' value={bad} />
        <br />

        <StatisticsLine text='All' value={sum} />
        <br />

        <StatisticsLine text='Average' value={Avg(good, neutral, bad)} />
        <br />

        <StatisticsLine text='Positive Rate' value={good > 0 ? (100 * good / sum) : 0} unit={'%'} />
      </div>
    )
  }

  // #endregion Statistics


  return (
    <div>
      <h1>
        Give Feedback
      </h1>

      <Button text='Good' handleClick={() => setGood(good + 1)} />
      &nbsp;
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
      &nbsp;
      <Button text='Bad' handleClick={() => setBad(bad + 1)} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App