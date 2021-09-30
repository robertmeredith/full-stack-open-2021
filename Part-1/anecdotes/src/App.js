import React, { useState } from 'react';

const Anecdote = ({ anecdotes, selected }) => {
  return <p>{anecdotes[selected]}</p>;
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomQuote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteClick = () => {
    let newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
  };

  const popularVote = () => {
    let index = null;
    let max = 0;
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i];
        index = i;
      }
    }
    return index;
  };

  const mostPopular = popularVote();

  return (
    <div>
      <h3>Anecdote of the Day</h3>
      <Anecdote anecdotes={anecdotes} selected={selected} />

      <button onClick={getRandomQuote}>Next Anecdote</button>
      <button onClick={handleVoteClick}>Vote!</button>

      <h3>Anecdote with most votes</h3>

      {mostPopular === null ? (
        <p>No votes yet</p>
      ) : (
        <Anecdote anecdotes={anecdotes} selected={mostPopular} />
      )}
    </div>
  );
};

export default App;
