import React, { useEffect, useRef, useState } from "react";
import MacWindow from "./MacWindow";
import "./cli.scss";

const PROMPT = "ankitpaul:~$";

const commands = {
  about: () =>
    "Ankit Paul - Software Development Engineer\n\nJunior Software Developer at Tachomind Private Limited, building Node.js/Express/MongoDB backends and shipping AI-powered features with OpenAI GPT-4/GPT-5.",
  skills: () =>
    `Languages: JavaScript, TypeScript, Java, SQL, Python
Frameworks & Libraries: React.js, Node.js, Express, MongoDB, Next.js, Tailwind CSS
Databases: MongoDB, MySQL
Tools & Platforms: Docker, AWS, GitHub, Git, Jira, Postman
Soft Skills: Teamwork, Adaptability, Critical Thinking, Communication, Problem Solving, Decision Making, Collaboration`,
  experience: () =>
    `Junior Software Developer - Tachomind Private Limited (Nov 2024 - Present), Bhubaneshwar
- Developed 30+ REST APIs using Node.js, Express.js, MongoDB, and Redis; 820+ Git commits across AI, analytics, and social media modules
- Integrated OpenAI GPT-4/GPT-5 for AI-powered caption generation, brand enrichment, image/video generation, and structured JSON workflows
- Built queue-based workers, cron jobs, and AWS S3 media pipelines for AI content generation, scheduled reports, and background processing
- Delivered Media Gallery, Social Inbox, Activity Tracking, marketing funnel analytics, and historical data backfilling
- Built website scraping and brand intelligence using Axios, Cheerio, Unsplash, Pixabay, and automated logo color extraction
- Refactored backend services, optimized MongoDB aggregations/queries/indexes, and collaborated in an Agile/Scrum team`,
  projects: () =>
    `1. mac-OS UI - Lead Developer (Mar 2026 - Present)
   macOS-inspired desktop app built with React, Vite, JavaScript, CSS. 10+ reusable components, draggable windows, Dock, desktop icons, theme support.

2. Food Order App - Lead Developer (Nov 2024 - Dec 2024)
   Full-stack food ordering app with React, Node.js, Express, MongoDB. 10+ REST endpoints, 5+ core modules (auth, cart, checkout).

3. Smart Health Assistant - Lead Developer (Jan 2024 - May 2024)
   Health management app in Java, HTML, CSS, JavaScript. Led a 5-member team, 8+ application modules.`,
  education: () =>
    "MCA - GITA Autonomous College (Jul 2022 - Jul 2024), CGPA 8.96/10",
  contact: () =>
    `Phone: 8658861656
Email: paulankit44@gmail.com
Location: Bhubaneswar`,
  resume: () => {
    window.open("/resume.pdf", "_blank");
    return "Opening resume.pdf ...";
  },
  help: () =>
    `Available commands:
about        About me
skills       Technical skills
experience   Work experience
projects     Featured projects
education    Education background
contact      Contact information
resume       Open resume.pdf
echo <text>  Print text
clear        Clear the terminal`,
};

const WELCOME =
  "Welcome to my portfolio CLI! Type 'help' to see available commands.";

const Cli = ({ windowName, setWindowsState }) => {
  const [lines, setLines] = useState([{ type: "output", text: WELCOME }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(null);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const runCommand = (raw) => {
    const trimmed = raw.trim();

    if (!trimmed) {
      setLines((prev) => [...prev, { type: "input", text: `${PROMPT} ` }]);
      return;
    }

    if (trimmed === "clear") {
      setLines([]);
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(null);
      setInput("");
      return;
    }

    const [name, ...args] = trimmed.split(/\s+/);
    let output;
    if (name === "echo") {
      output = args.join(" ");
    } else if (commands[name]) {
      output = commands[name]();
    } else {
      output = `Command not found: ${name}. Type 'help' for a list of commands.`;
    }

    setLines((prev) => [
      ...prev,
      { type: "input", text: `${PROMPT} ${raw}` },
      { type: "output", text: output },
    ]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(null);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  };

  return (
    <MacWindow windowName={windowName} setWindowsState={setWindowsState}>
      <div className="cli-window" onClick={() => inputRef.current?.focus()}>
        {lines.map((line, i) => (
          <div key={i} className={`cli-line cli-line--${line.type}`}>
            {line.text}
          </div>
        ))}
        <div className="cli-line cli-line--input">
          <span className="cli-prompt">{PROMPT}</span>
          <input
            ref={inputRef}
            className="cli-input"
            value={input}
            autoFocus
            spellCheck={false}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </MacWindow>
  );
};

export default Cli;
