import React from "react";

import { CoursePartProps, CoursePart } from '../types';

const typeSwitch = (p: CoursePart) => {
  switch (p.type) {
    case "normal" || "submission" || "special":
      return (<i>{p?.description}</i>);
    case "groupProject":
      return (`Project exercises: ${p.groupProjectCount}`);
    case "submission":
      return (
        <>
          <i>{p?.description}</i>
          <br />
          Submit to <a href={p.exerciseSubmissionLink}>{p.exerciseSubmissionLink}</a>
        </>
      );
    case "special":
      return (
        <>
          <i>{p?.description}</i>
          <br />
          Required skills: {p.requirements.join(", ")}
        </>
      )
    default:
      return null;
  }
}

const Contents = (props: CoursePartProps) => {
  return (
    <div>
      {props.parts.map(p =>
        <p key={p.name}>
          <b>
            {p.name} {p.exerciseCount}
          </b>

          <br />

          {typeSwitch(p)}
        </p>
      )}
    </div>
  );
};


export default Contents;