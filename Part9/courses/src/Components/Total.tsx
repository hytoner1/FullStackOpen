import React from "react";

import { ContentsProps } from '../types';

const Total = (props: ContentsProps) => {
  return (
    <div>
      <p>
        Number of exercises:{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  );
};


export default Total;