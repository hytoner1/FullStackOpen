import React from "react";

import { CoursePartProps } from '../types';

const Total = (props: CoursePartProps) => {
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