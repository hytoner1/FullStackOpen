import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Average = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad
    if (sum === 0) {
      return (
        <div>
          Average 0
        </div>
      )
    }

    return (
      <div>
        Average {(good-bad) / sum}
      </div>
    )
  }



  const PositiveRate = ({ good, neutral, bad }) => {
    if (good > 0) {
      return (
        <div>
          Positive {100 * good / (good + neutral + bad)} %
        </div>
      )
    }
    return (
      <div>
        Positive 0
      </div>
    )
  }


  return (
    <div>
      <h1>
        Give Feedback
      </h1>

      <p>
        <button onClick={() => setGood(good + 1)}>
          Good
        </button>
        <button onClick={() => setNeutral(neutral + 1)}>
          Neutral
        </button>
        <button onClick={() => setBad(bad + 1)}>
          Bad
        </button>
      </p>

      <h2>
        Statistics
      </h2>

      <p>
        Good {good}
        <br/>
        Neutral {neutral}
        <br/>
        Bad {bad}
      </p>
      <p>
        All {good + neutral + bad}
      </p>
      <Average good={good} neutral={neutral} bad={bad} />
      <PositiveRate good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App