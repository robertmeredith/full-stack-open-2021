import React, { useState } from 'react';

// const Display = ({ counter }) => <div>{counter}</div>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {allClicks.join(',  ')}</div>;
};

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAllClicks] = useState([]);

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'));
    setLeft(left + 1);
  };
  const handleRightClick = () => {
    setAllClicks(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="Left" />
      <Button onClick={handleRightClick} text="Right" />
      {right}
      <History allClicks={allClicks} />
    </div>
  );
};

export default App;
