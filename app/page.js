"use client";
import React, { useMemo, useState } from "react";

const options = [
  { label: "Select", value: 0 },
  { label: "Early", value: 1 },
  { label: "Advanced", value: 2 },
  { label: "Mature", value: 3 }
];

const domains = [
  {
    name: "Customer as Asset",
    questions: [
      "Track customer growth/loss?",
      "Integrated customer data?",
      "Understand why customers leave?"
    ]
  },
  {
    name: "Align Around Experience",
    questions: [
      "Defined end-to-end experience?",
      "Mapped journeys?",
      "Focus on customer value?"
    ]
  },
  {
    name: "Customer Listening",
    questions: [
      "Collect feedback properly?",
      "Capture real-time signals?",
      "Use insights effectively?"
    ]
  },
  {
    name: "Reliability & Innovation",
    questions: [
      "Detect customer risk early?",
      "Fix root causes?",
      "Use insights for innovation?"
    ]
  },
  {
    name: "Leadership & Culture",
    questions: [
      "Leadership aligned?",
      "Leaders listen to customers?",
      "Employees empowered?"
    ]
  }
];

export default function Page() {
  const [answers, setAnswers] = useState({});

  const handleChange = (d, q, val) => {
    setAnswers({ ...answers, [`${d}-${q}`]: Number(val) });
  };

  const scores = useMemo(() => {
    return domains.map((domain, d) => {
      const vals = domain.questions.map((_, q) => answers[`${d}-${q}`] || 0);
      const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
      return { name: domain.name, score: avg || 0 };
    });
  }, [answers]);

  const overall =
    scores.reduce((a, b) => a + b.score, 0) / scores.length || 0;

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>CX Maturity Assessment</h1>

      {domains.map((domain, d) => (
        <div key={d} style={{ marginBottom: 20 }}>
          <h3>{domain.name}</h3>

          {domain.questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <p>{q}</p>
              <select
                onChange={(e) => handleChange(d, i, e.target.value)}
              >
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      ))}

      <h2>Overall Score: {overall.toFixed(2)} / 3</h2>

      <h3>Domain Scores</h3>
      {scores.map((s, i) => (
        <p key={i}>
          {s.name}: {s.score.toFixed(2)}
        </p>
      ))}
    </div>
  );
}
