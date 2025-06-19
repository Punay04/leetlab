"use client";

import CodeEditor from "@/components/codeEditor";
import React, { useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ problemId: string }>;
}) {
  const { problemId } = React.use(params);
  const [problem, setProblem] = useState<any>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`/api/getProblem?problemId=${problemId}`);
        if (!response.ok) throw new Error("Failed to fetch problem");
        const data = await response.json();
        setProblem(data);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };

    fetchProblem();
  }, [problemId]);

  return (
    <div className="bg-black min-h-screen p-10 text-white">
      {problem ? (
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-yellow-500">
            {problem.title}
          </h1>
          <p className="text-lg text-gray-300">{problem.description}</p>
          <div className="text-gray-400">
            <h2 className="font-semibold text-lg mt-4">Input Format:</h2>
            <pre className="whitespace-pre-wrap">{problem.inputFormat}</pre>

            <h2 className="font-semibold text-lg mt-4">Output Format:</h2>
            <pre className="whitespace-pre-wrap">{problem.outputFormat}</pre>

            <h2 className="font-semibold text-lg mt-4">Constraints:</h2>
            <pre className="whitespace-pre-wrap">{problem.constraints}</pre>

            <h2 className="font-semibold text-lg mt-4">Examples:</h2>
            {problem.examples?.map((ex: any, idx: number) => (
              <div
                key={idx}
                className="mb-3 border border-gray-700 p-3 rounded-md"
              >
                <p className="text-sm">Input:</p>
                <pre className="bg-gray-800 p-2 rounded text-sm">
                  {ex.input}
                </pre>
                <p className="text-sm mt-2">Output:</p>
                <pre className="bg-gray-800 p-2 rounded text-sm">
                  {ex.output}
                </pre>
              </div>
            ))}
          </div>
          <CodeEditor />
        </div>
      ) : (
        <div className="text-gray-500 animate-pulse">Loading problem...</div>
      )}
    </div>
  );
}
