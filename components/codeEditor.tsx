"use client";

import { useUser } from "@clerk/nextjs";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useState } from "react";

const languageMap: Record<string, number> = {
  javascript: 63,
  python: 71,
  cpp: 54,
};

export default function CodeEditor({
  examples = [],
  problemId,
}: {
  examples: { input: string; output: string }[];
  problemId: string;
}) {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useUser();
  const userId = user.user?.id;

  const runCode = async () => {
    setLoading(true);
    setOutput("");
    try {
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageMap[language],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      const result =
        res.data.stdout ||
        res.data.stderr ||
        res.data.compile_output ||
        res.data.message ||
        "No output";
      setOutput(result.trim());
    } catch (err) {
      console.log("Error running code:", err);

      setOutput("Error running code.");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!examples.length) return setOutput("No testcases provided.");

    setOutput("Submitting...");
    let allPassed = true;

    for (const test of examples) {
      try {
        const res = await axios.post(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          {
            source_code: code,
            language_id: languageMap[language],
            stdin: test.input,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
              "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
          }
        );

        const actual = (res.data.stdout || "").trim();
        const expected = (test.output || "").trim();

        if (actual !== expected) {
          setOutput(
            `❌ Failed:\nInput:\n${test.input}\nExpected:\n${expected}\nGot:\n${actual}`
          );
          allPassed = false;
          break;
        }
      } catch (err) {
        console.log("Error running test case:", err);

        setOutput("Submission failed.");
        allPassed = false;
        break;
      }
    }

    if (allPassed) {
      try {
        const res = await fetch("/api/solvedProblem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            problemId,
            code,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data?.error === "Problem already solved by this user") {
            setOutput("✅ All testcases passed!");
          } else {
            throw new Error(data?.error || "Failed to save solved problem");
          }
        } else {
          setOutput("✅ All testcases passed");
        }
      } catch (error) {
        console.error("Error saving solved problem:", error);
        setOutput("✅ Passed, but failed to record in DB.");
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 rounded-md px-3 py-1 text-sm"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        <div className="space-x-2">
          <button
            onClick={runCode}
            className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400"
          >
            {loading ? "Running..." : "Run Code"}
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-black px-4 py-1 rounded hover:bg-green-400"
          >
            Submit
          </button>
        </div>
      </div>

      <Editor
        height="400px"
        defaultLanguage={language}
        language={language}
        value={code}
        onChange={(val) => setCode(val || "")}
        theme="vs-dark"
        options={{ fontSize: 14, minimap: { enabled: false } }}
      />

      <div className="mt-6 rounded-lg border border-gray-700 bg-[#1e1e1e] p-4 shadow-inner">
        <div className="mb-2 text-sm font-semibold text-gray-300 border-b border-gray-700 pb-1">
          Output
        </div>

        <div
          className={`whitespace-pre-wrap text-sm px-1 overflow-auto max-h-64 ${
            output.includes("✅")
              ? "text-green-400"
              : output.includes("❌") || output.toLowerCase().includes("error")
              ? "text-red-400"
              : "text-gray-200"
          }`}
        >
          {output}
        </div>
      </div>
    </div>
  );
}
