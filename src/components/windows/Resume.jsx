import React from "react";
import MacWindow from "./MacWindow";
import "./resume.scss"

const Resume = () => {
  return (
    <MacWindow>
      <div className="resume-window">
        <iframe src="/resume.pdf"></iframe>
      </div>
    </MacWindow>
  );
};

export default Resume;
