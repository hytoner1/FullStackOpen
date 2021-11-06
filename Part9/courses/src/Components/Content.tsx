import React from "react";

import { CoursePartProps } from '../types';

const Content = (props: CoursePartProps) => {
  return (
    <div>
      {props.parts.map(p => {
        switch (p.type) {
          case "normal" || "submission" || "special":
            return p?.description;
        }
      })}
    </div>
  );

  //return (
  //  <div>
  //    {props.parts.map(p => <p key={p.name}> <b> {p.name} {p.exerciseCount} </b> </p>)}
  //  </div>
  //);
};

export default Content;