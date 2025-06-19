"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState("// Write your solution here...");
  const [language, setLanguage] = useState("javascript");

  const languageOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "C++", value: "cpp" },
  ];

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-yellow-400">Your Solution</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none"
        >
          {languageOptions.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="border border-slate-700 rounded-md overflow-hidden">
        <Editor
          height="400px"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>

      <button
        onClick={() => console.log({ code, language })}
        className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
      >
        Submit Code
      </button>
    </div>
  );
}
