import React, { useState } from 'react';

const Statistics = ({ results }) => {
  let { good, neutral, bad } = results;

  const total = good + neutral + bad;
  const score = good - bad;
  const average = score / total || 0;
  const positive = (good / total) * 100 || 0;

  if (total > 0) {
    return (
      <>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <StatisticLine text="Good:" value={good} />
            <StatisticLine text="Neutral:" value={neutral} />
            <StatisticLine text="Bad:" value={bad} />
            <StatisticLine text="Total Votes:" value={total} />
            <StatisticLine text="Score:" value={score} />
            <StatisticLine text="Average:" value={average} />
            <StatisticLine text="Positive:" value={`${positive}%`} />
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </>
  );
};

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const results = {
    good,
    neutral,
    bad,
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <div>
        <Button onClick={() => setGood(good + 1)} text="Good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
        <Button onClick={() => setBad(bad + 1)} text="Bad" />
        {/* <button onClick={() => setGood(good + 1)}>Good</button>
        <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
        <button onClick={() => setBad(bad + 1)}>Bad</button> */}
      </div>
      <Statistics results={results} />
    </div>
  );
};

export default App;
