import React from "react";

import { ContentsProps } from '../types';

const Contents = (props: ContentsProps) => {
  console.log(props.parts);
  return (
    <div>
      {props.parts.map(p => <p key={p.name}>{p.name} {p.exerciseCount} </p>)}
    </div>
  );
};


export default Contents;