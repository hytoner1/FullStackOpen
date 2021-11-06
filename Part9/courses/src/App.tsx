import React from 'react';

import Header from './Components/Header';
import Contents from './Components/Contents';
import Total from './Components/Total';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Contents parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App; 